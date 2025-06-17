
import { useMemo } from 'react';
import { Link, Category } from '@/types';

export const useLinkStats = (links: Link[], categories: Category[]) => {
  return useMemo(() => ({
    totalLinks: links.length,
    totalCategories: categories.length,
    highPriorityLinks: links.filter(l => l.priority === "high").length,
    uniqueTags: new Set(links.flatMap(l => l.tags)).size
  }), [links, categories]);
};
