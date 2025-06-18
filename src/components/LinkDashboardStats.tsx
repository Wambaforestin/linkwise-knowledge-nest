
interface LinkDashboardStatsProps {
  startIndex: number;
  totalFiltered: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export const LinkDashboardStats = ({
  startIndex,
  totalFiltered,
  currentPage,
  totalPages,
  itemsPerPage
}: LinkDashboardStatsProps) => {
  const endIndex = startIndex + itemsPerPage;
  
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>
        Showing {startIndex + 1}-{Math.min(endIndex, totalFiltered)} of {totalFiltered} links
      </span>
      <span>
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};
