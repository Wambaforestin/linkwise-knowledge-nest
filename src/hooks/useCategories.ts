
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { categoryService } from '@/services/categoryService';
import { useCategoryMutations } from '@/hooks/useCategoryMutations';

export const useCategories = () => {
  const { user } = useAuth();
  
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories', user?.id],
    queryFn: async () => {
      if (!user) return [];
      return categoryService.fetchCategories(user.id);
    },
    enabled: !!user,
  });

  const {
    createDefaultCategoriesMutation,
    addCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  } = useCategoryMutations();

  // Create default categories for new users
  useEffect(() => {
    if (user && !isLoading && categories.length === 0) {
      createDefaultCategoriesMutation.mutate();
    }
  }, [user, isLoading, categories.length]);

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
