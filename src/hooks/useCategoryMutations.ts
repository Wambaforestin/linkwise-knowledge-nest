
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Category } from '@/types';
import { categoryService } from '@/services/categoryService';

export const useCategoryMutations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createDefaultCategoriesMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');
      await categoryService.createDefaultCategories(user.id);
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

  const addCategoryMutation = useMutation({
    mutationFn: async (newCategory: Omit<Category, 'id'>) => {
      if (!user) throw new Error('User not authenticated');
      return categoryService.addCategory(user.id, newCategory);
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
      return categoryService.updateCategory(user.id, id, updates);
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
      await categoryService.deleteCategory(user.id, id);
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
    createDefaultCategoriesMutation,
    addCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  };
};
