import { useState } from "react";
import { LinkDashboard } from "@/components/LinkDashboard";
import { AddLinkDialog } from "@/components/AddLinkDialog";
import { EditLinkDialog } from "@/components/EditLinkDialog";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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

  const [categories] = useState<Category[]>([
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">LinkWise</h1>
              <p className="text-muted-foreground mt-2">
                Your digital reference library for organizing and discovering links
              </p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Link
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search links, categories, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold">{links.length}</div>
              <div className="text-sm text-muted-foreground">Total Links</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold">
                {links.filter(l => l.priority === "high").length}
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-2xl font-bold">
                {new Set(links.flatMap(l => l.tags)).size}
              </div>
              <div className="text-sm text-muted-foreground">Unique Tags</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <LinkDashboard
          links={filteredLinks}
          categories={categories}
          onUpdateLink={updateLink}
          onDeleteLink={deleteLink}
          onEditLink={handleEditLink}
        />

        {/* Add Link Dialog */}
        <AddLinkDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAddLink={addLink}
          categories={categories}
        />

        {/* Edit Link Dialog */}
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
