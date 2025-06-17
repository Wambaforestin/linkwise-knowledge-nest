import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Category } from '@/types';

const DEFAULT_CATEGORIES = [
  { name: 'Work', color: '#3b82f6' },
  { name: 'Personal', color: '#10b981' },
  { name: 'Learning', color: '#f59e0b' },
  { name: 'Entertainment', color: '#8b5cf6' },
  { name: 'News', color: '#ef4444' },
  { name: 'Tools', color: '#6b7280' },
];

export const useCategories = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data.map(cat => ({
        id: cat.id,
        name: cat.name,
        color: cat.color || '#3b82f6',
        parentId: cat.parent_id || undefined
      }));
    },
    enabled: !!user,
  });

  // Create default categories for new users
  const createDefaultCategoriesMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const defaultCategoriesToInsert = DEFAULT_CATEGORIES.map(category => ({
        user_id: user.id,
        name: category.name,
        color: category.color,
        parent_id: null
      }));

      const { error } = await supabase
        .from('categories')
        .insert(defaultCategoriesToInsert);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', user?.id] });
      toast({
        title: "Welcome!",
        description: "We've created some default categories to help you get started",
      });
    },
    onError: (error) => {
      console.error('Create default categories error:', error);
    },
  });

  // Check if we need to create default categories
  useEffect(() => {
    if (user && !isLoading && categories.length === 0) {
      createDefaultCategoriesMutation.mutate();
    }
  }, [user, isLoading, categories.length]);

  const addCategoryMutation = useMutation({
    mutationFn: async (newCategory: Omit<Category, 'id'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('categories')
        .insert({
          user_id: user.id,
          name: newCategory.name,
          color: newCategory.color || '#3b82f6',
          parent_id: newCategory.parentId || null
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', user?.id] });
      toast({
        title: "Success",
        description: "Category added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
      console.error('Add category error:', error);
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Category> }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('categories')
        .update({
          name: updates.name,
          color: updates.color,
          parent_id: updates.parentId || null
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['links', user?.id] });
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
      console.error('Update category error:', error);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['links', user?.id] });
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
      console.error('Delete category error:', error);
    },
  });

  return {
    categories,
    isLoading,
    error,
    addCategory: addCategoryMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    isAdding: addCategoryMutation.isPending,
    isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending,
  };
};
