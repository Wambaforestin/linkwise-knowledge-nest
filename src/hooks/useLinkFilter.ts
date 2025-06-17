
import { useMemo } from 'react';
import { Link } from '@/types';

export const useLinkFilter = (links: Link[], searchQuery: string) => {
  return useMemo(() => {
    return links.filter(link => {
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        link.title.toLowerCase().includes(query) ||
        link.description?.toLowerCase().includes(query) ||
        link.category.toLowerCase().includes(query) ||
        link.tags.some(tag => tag.toLowerCase().includes(query)) ||
        link.notes?.toLowerCase().includes(query)
      );
    });
  }, [links, searchQuery]);
};
