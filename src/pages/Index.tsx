
import { useState } from "react";
import { LinkDashboard } from "@/components/LinkDashboard";
import { AddLinkDialog } from "@/components/AddLinkDialog";
import { EditLinkDialog } from "@/components/EditLinkDialog";
import { LinkPageHeader } from "@/components/LinkPageHeader";
import { LinkSearch } from "@/components/LinkSearch";
import { LinkStatsCards } from "@/components/LinkStatsCards";
import { useLinks } from "@/hooks/useLinks";
import { useCategories } from "@/hooks/useCategories";
import { useLinkFilter } from "@/hooks/useLinkFilter";
import { useLinkStats } from "@/hooks/useLinkStats";
import { Link, Category } from "@/types";

const Index = () => {
  const {
    links,
    isLoading: linksLoading,
    addLink,
    updateLink,
    deleteLink
  } = useLinks();

  const {
    categories,
    isLoading: categoriesLoading,
    addCategory,
    updateCategory,
    deleteCategory
  } = useCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredLinks = useLinkFilter(links, searchQuery);
  const statsData = useLinkStats(links, categories);

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    setIsEditDialogOpen(true);
  };

  const handleUpdateLink = (id: string, updates: Partial<Link>) => {
    updateLink({ id, updates });
  };

  const handleAddCategory = (newCategory: Omit<Category, "id">) => {
    addCategory(newCategory);
  };

  const handleUpdateCategory = (id: string, updates: Partial<Category>) => {
    updateCategory({ id, updates });
  };

  if (linksLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 mb-8">
          <LinkPageHeader
            categories={categories}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
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
          onUpdateLink={handleUpdateLink}
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
          onUpdateLink={handleUpdateLink}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default Index;
