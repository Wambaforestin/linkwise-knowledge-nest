
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface LinkDashboardPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const LinkDashboardPagination = ({
  currentPage,
  totalPages,
  setCurrentPage
}: LinkDashboardPaginationProps) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {/* First Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className="gap-1"
      >
        <ChevronsLeft className="h-4 w-4" />
        First
      </Button>

      {/* Previous Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {generatePageNumbers().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-sm text-muted-foreground">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page as number)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Next Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Last Page */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className="gap-1"
      >
        Last
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
