
import { useState } from "react";
import { LinkDashboard } from "@/components/LinkDashboard";
import { AddLinkDialog } from "@/components/AddLinkDialog";
import { EditLinkDialog } from "@/components/EditLinkDialog";
import { LinkPageHeader } from "@/components/LinkPageHeader";
import { LinkSearch } from "@/components/LinkSearch";
import { LinkStatsCards } from "@/components/LinkStatsCards";

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

const Index = () => {
  const [links, setLinks] = useState<Link[]>([
    {
      id: "1",
      url: "https://react.dev",
      title: "React Documentation",
      description: "The official React documentation",
      category: "Development",
      tags: ["react", "documentation", "frontend"],
      priority: "high",
      dateAdded: new Date("2024-01-15"),
      notes: "Essential reading for React development"
    },
    {
      id: "2",
      url: "https://tailwindcss.com",
      title: "Tailwind CSS",
      description: "A utility-first CSS framework",
      category: "Development",
      tags: ["css", "styling", "framework"],
      priority: "medium",
      dateAdded: new Date("2024-01-10"),
    },
    {
      id: "3",
      url: "https://research.google.com",
      title: "Google Research",
      description: "Latest research papers and insights",
      category: "Research",
      tags: ["ai", "research", "papers"],
      priority: "high",
      dateAdded: new Date("2024-01-20"),
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Development", color: "#3b82f6" },
    { id: "2", name: "Research", color: "#10b981" },
    { id: "3", name: "Design", color: "#f59e0b" },
    { id: "4", name: "Business", color: "#ef4444" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const addLink = (newLink: Omit<Link, "id" | "dateAdded">) => {
    const link: Link = {
      ...newLink,
      id: Date.now().toString(),
      dateAdded: new Date()
    };
    setLinks(prev => [link, ...prev]);
  };

  const updateLink = (id: string, updates: Partial<Link>) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, ...updates } : link
    ));
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    setIsEditDialogOpen(true);
  };

  const addCategory = (newCategory: Omit<Category, "id">) => {
    const category: Category = {
      ...newCategory,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, category]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...updates } : category
    ));
    
    if (updates.name) {
      const oldCategory = categories.find(c => c.id === id);
      if (oldCategory) {
        setLinks(prev => prev.map(link => 
          link.category === oldCategory.name ? { ...link, category: updates.name! } : link
        ));
      }
    }
  };

  const deleteCategory = (id: string) => {
    const categoryToDelete = categories.find(c => c.id === id);
    if (categoryToDelete) {
      setLinks(prev => prev.map(link => 
        link.category === categoryToDelete.name ? { ...link, category: "Uncategorized" } : link
      ));
      
      if (!categories.some(c => c.name === "Uncategorized")) {
        setCategories(prev => [...prev.filter(c => c.id !== id), {
          id: "uncategorized",
          name: "Uncategorized",
          color: "#6b7280"
        }]);
      } else {
        setCategories(prev => prev.filter(c => c.id !== id));
      }
    }
  };

  const filteredLinks = links.filter(link => {
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

  const statsData = {
    totalLinks: links.length,
    totalCategories: categories.length,
    highPriorityLinks: links.filter(l => l.priority === "high").length,
    uniqueTags: new Set(links.flatMap(l => l.tags)).size
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 mb-8">
          <LinkPageHeader
            categories={categories}
            onAddCategory={addCategory}
            onUpdateCategory={updateCategory}
            onDeleteCategory={deleteCategory}
            onAddLinkClick={() => setIsAddDialogOpen(true)}
          />

          <LinkSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <LinkStatsCards {...statsData} />
        </div>

        <LinkDashboard
          links={filteredLinks}
          categories={categories}
          onUpdateLink={updateLink}
          onDeleteLink={deleteLink}
          onEditLink={handleEditLink}
        />

        <AddLinkDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAddLink={addLink}
          categories={categories}
        />

        <EditLinkDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          link={editingLink}
          onUpdateLink={updateLink}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default Index;
