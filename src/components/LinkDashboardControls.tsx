
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Table2, Grid3X3, Filter, Download, ChevronDown } from "lucide-react";
import { Category, Link } from "@/types";

interface LinkDashboardControlsProps {
  view: "table" | "cards";
  setView: (view: "table" | "cards") => void;
  sortBy: "dateAdded" | "title" | "priority";
  setSortBy: (sortBy: "dateAdded" | "title" | "priority") => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterPriority: string;
  setFilterPriority: (priority: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  categories: Category[];
  filteredLinks: Link[];
  handleFilterChange: (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => void;
  handleItemsPerPageChange: (value: string) => void;
}

export const LinkDashboardControls = ({
  view,
  setView,
  sortBy,
  setSortBy,
  filterCategory,
  setFilterCategory,
  filterPriority,
  setFilterPriority,
  itemsPerPage,
  categories,
  filteredLinks,
  handleFilterChange,
  handleItemsPerPageChange
}: LinkDashboardControlsProps) => {
  const exportToJSON = () => {
    const dataStr = JSON.stringify(filteredLinks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'linkwise-export.json');
    linkElement.click();
  };

  const exportToCSV = () => {
    const headers = ['Title', 'URL', 'Category', 'Priority', 'Tags', 'Description', 'Notes', 'Date Added'];
    const csvContent = [
      headers.join(','),
      ...filteredLinks.map(link => [
        `"${link.title.replace(/"/g, '""')}"`,
        `"${link.url}"`,
        `"${link.category}"`,
        `"${link.priority}"`,
        `"${link.tags.join('; ')}"`,
        `"${(link.description || '').replace(/"/g, '""')}"`,
        `"${(link.notes || '').replace(/"/g, '""')}"`,
        `"${link.dateAdded.toLocaleDateString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'linkwise-export.csv');
    link.click();
  };

  return (
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
      <Select value={filterCategory} onValueChange={(value) => handleFilterChange(setFilterCategory, value)}>
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
      <Select value={filterPriority} onValueChange={(value) => handleFilterChange(setFilterPriority, value)}>
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

      {/* Items per page */}
      <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>

      {/* Export Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={exportToJSON}>
            Export as JSON
          </DropdownMenuItem>
          <DropdownMenuItem onClick={exportToCSV}>
            Export as CSV
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
  );
};
