import { useState } from "react";
import { Link, Category } from "@/types";
import { LinkTable } from "./LinkTable";
import { LinkCards } from "./LinkCards";
import { LinkDashboardControls } from "./LinkDashboardControls";
import { LinkDashboardStats } from "./LinkDashboardStats";
import { LinkDashboardPagination } from "./LinkDashboardPagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedLinks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLinks = filteredAndSortedLinks.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <LinkDashboardControls
        view={view}
        setView={setView}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        categories={categories}
        filteredLinks={filteredAndSortedLinks}
        handleFilterChange={handleFilterChange}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />

      <LinkDashboardStats
        startIndex={startIndex}
        totalFiltered={filteredAndSortedLinks.length}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
      />

      {view === "table" ? (
        <LinkTable
          links={currentLinks}
          onUpdateLink={onUpdateLink}
          onDeleteLink={onDeleteLink}
          onEditLink={onEditLink}
        />
      ) : (
        <LinkCards
          links={currentLinks}
          onUpdateLink={onUpdateLink}
          onDeleteLink={onDeleteLink}
          onEditLink={onEditLink}
        />
      )}

      <LinkDashboardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
