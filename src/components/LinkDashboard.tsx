
import { useState } from "react";
import { Link, Category } from "@/pages/Index";
import { LinkTable } from "./LinkTable";
import { LinkCards } from "./LinkCards";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table2, Grid3X3, Filter, Download } from "lucide-react";

interface LinkDashboardProps {
  links: Link[];
  categories: Category[];
  onUpdateLink: (id: string, updates: Partial<Link>) => void;
  onDeleteLink: (id: string) => void;
  onEditLink: (link: Link) => void;
}

export const LinkDashboard = ({ 
  links, 
  categories, 
  onUpdateLink, 
  onDeleteLink,
  onEditLink
}: LinkDashboardProps) => {
  const [view, setView] = useState<"table" | "cards">("table");
  const [sortBy, setSortBy] = useState<"dateAdded" | "title" | "priority">("dateAdded");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const filteredAndSortedLinks = links
    .filter(link => {
      if (filterCategory !== "all" && link.category !== filterCategory) return false;
      if (filterPriority !== "all" && link.priority !== filterPriority) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "dateAdded":
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

  const exportData = () => {
    const dataStr = JSON.stringify(filteredAndSortedLinks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'linkwise-export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border">
        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={view === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("table")}
            className="gap-2"
          >
            <Table2 className="h-4 w-4" />
            Table
          </Button>
          <Button
            variant={view === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("cards")}
            className="gap-2"
          >
            <Grid3X3 className="h-4 w-4" />
            Cards
          </Button>
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dateAdded">Date Added</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter by Category */}
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter by Priority */}
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Export */}
        <Button variant="outline" size="sm" onClick={exportData} className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>

        {/* Active Filters */}
        <div className="flex items-center gap-2 ml-auto">
          {filterCategory !== "all" && (
            <Badge variant="secondary" className="gap-1">
              <Filter className="h-3 w-3" />
              {filterCategory}
            </Badge>
          )}
          {filterPriority !== "all" && (
            <Badge variant="secondary" className="gap-1">
              <Filter className="h-3 w-3" />
              {filterPriority}
            </Badge>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredAndSortedLinks.length} of {links.length} links
      </div>

      {/* Content */}
      {view === "table" ? (
        <LinkTable
          links={filteredAndSortedLinks}
          onUpdateLink={onUpdateLink}
          onDeleteLink={onDeleteLink}
          onEditLink={onEditLink}
        />
      ) : (
        <LinkCards
          links={filteredAndSortedLinks}
          onUpdateLink={onUpdateLink}
          onDeleteLink={onDeleteLink}
          onEditLink={onEditLink}
        />
      )}
    </div>
  );
};
