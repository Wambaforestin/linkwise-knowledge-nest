
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Link {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
  tags: string[];
  priority: "low" | "medium" | "high";
  dateAdded: Date;
  lastAccessed?: Date;
  notes?: string;
}

export const useLinks = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: links = [], isLoading, error } = useQuery({
    queryKey: ['links', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('links')
        .select(`
          *,
          categories!inner(name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data.map(link => ({
        id: link.id,
        url: link.url,
        title: link.title,
        description: link.description || undefined,
        category: link.categories?.name || 'Uncategorized',
        tags: link.tags || [],
        priority: link.priority as "low" | "medium" | "high",
        dateAdded: new Date(link.created_at),
        lastAccessed: link.last_accessed ? new Date(link.last_accessed) : undefined,
        notes: link.notes || undefined
      }));
    },
    enabled: !!user,
  });

  const addLinkMutation = useMutation({
    mutationFn: async (newLink: Omit<Link, "id" | "dateAdded">) => {
      if (!user) throw new Error('User not authenticated');
      
      // Find category ID by name
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('name', newLink.category)
        .eq('user_id', user.id)
        .single();

      const { data, error } = await supabase
        .from('links')
        .insert({
          user_id: user.id,
          url: newLink.url,
          title: newLink.title,
          description: newLink.description || null,
          category_id: categoryData?.id || null,
          tags: newLink.tags,
          priority: newLink.priority,
          notes: newLink.notes || null
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', user?.id] });
      toast({
        title: "Success",
        description: "Link added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add link",
        variant: "destructive",
      });
      console.error('Add link error:', error);
    },
  });

  const updateLinkMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Link> }) => {
      if (!user) throw new Error('User not authenticated');
      
      let categoryId = null;
      if (updates.category) {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('name', updates.category)
          .eq('user_id', user.id)
          .single();
        categoryId = categoryData?.id || null;
      }

      const updateData: any = {};
      if (updates.url) updateData.url = updates.url;
      if (updates.title) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description || null;
      if (updates.category) updateData.category_id = categoryId;
      if (updates.tags) updateData.tags = updates.tags;
      if (updates.priority) updateData.priority = updates.priority;
      if (updates.notes !== undefined) updateData.notes = updates.notes || null;
      if (updates.lastAccessed) updateData.last_accessed = updates.lastAccessed.toISOString();

      const { data, error } = await supabase
        .from('links')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', user?.id] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update link",
        variant: "destructive",
      });
      console.error('Update link error:', error);
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', user?.id] });
      toast({
        title: "Success",
        description: "Link deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete link",
        variant: "destructive",
      });
      console.error('Delete link error:', error);
    },
  });

  return {
    links,
    isLoading,
    error,
    addLink: addLinkMutation.mutate,
    updateLink: updateLinkMutation.mutate,
    deleteLink: deleteLinkMutation.mutate,
    isAdding: addLinkMutation.isPending,
    isUpdating: updateLinkMutation.isPending,
    isDeleting: deleteLinkMutation.isPending,
  };
};
