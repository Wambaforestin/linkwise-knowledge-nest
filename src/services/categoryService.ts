
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types';
import { DEFAULT_CATEGORIES } from '@/constants/categories';

export const categoryService = {
  async fetchCategories(userId: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data.map(cat => ({
      id: cat.id,
      name: cat.name,
      color: cat.color || '#3b82f6',
      parentId: cat.parent_id || undefined
    }));
  },

  async createDefaultCategories(userId: string) {
    const defaultCategoriesToInsert = DEFAULT_CATEGORIES.map(category => ({
      user_id: userId,
      name: category.name,
      color: category.color,
      parent_id: null
    }));

    const { error } = await supabase
      .from('categories')
      .insert(defaultCategoriesToInsert);

    if (error) throw error;
  },

  async addCategory(userId: string, newCategory: Omit<Category, 'id'>) {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        user_id: userId,
        name: newCategory.name,
        color: newCategory.color || '#3b82f6',
        parent_id: newCategory.parentId || null
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCategory(userId: string, id: string, updates: Partial<Category>) {
    const { data, error } = await supabase
      .from('categories')
      .update({
        name: updates.name,
        color: updates.color,
        parent_id: updates.parentId || null
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCategory(userId: string, id: string) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }
};
