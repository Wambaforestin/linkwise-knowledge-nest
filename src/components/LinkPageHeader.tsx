
import { CategoryManager } from "@/components/CategoryManager";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, User } from "lucide-react";
import { Category } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">LinkWise</h1>
        <p className="text-muted-foreground mt-2">
          Your digital reference library for organizing and discovering links
        </p>
      </div>
      <div className="flex gap-2 items-center">
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>
              {user?.email}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
