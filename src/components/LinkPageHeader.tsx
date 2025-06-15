
import { CategoryManager } from "@/components/CategoryManager";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Category } from "@/pages/Index";

interface LinkPageHeaderProps {
  categories: Category[];
  onAddCategory: (newCategory: Omit<Category, "id">) => void;
  onUpdateCategory: (id: string, updates: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
  onAddLinkClick: () => void;
}

export const LinkPageHeader = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddLinkClick
}: LinkPageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">LinkWise</h1>
        <p className="text-muted-foreground mt-2">
          Your digital reference library for organizing and discovering links
        </p>
      </div>
      <div className="flex gap-2">
        <CategoryManager
          categories={categories}
          onAddCategory={onAddCategory}
          onUpdateCategory={onUpdateCategory}
          onDeleteCategory={onDeleteCategory}
        />
        <Button onClick={onAddLinkClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Link
        </Button>
      </div>
    </div>
  );
};
