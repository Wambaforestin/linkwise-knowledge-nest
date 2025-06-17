
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

export interface Category {
  id: string;
  name: string;
  color?: string;
  parentId?: string;
}
