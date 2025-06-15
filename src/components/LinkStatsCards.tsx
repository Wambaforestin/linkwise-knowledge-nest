
interface LinkStatsCardsProps {
  totalLinks: number;
  totalCategories: number;
  highPriorityLinks: number;
  uniqueTags: number;
}

export const LinkStatsCards = ({ 
  totalLinks, 
  totalCategories, 
  highPriorityLinks, 
  uniqueTags 
}: LinkStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-card rounded-lg p-4 border">
        <div className="text-2xl font-bold">{totalLinks}</div>
        <div className="text-sm text-muted-foreground">Total Links</div>
      </div>
      <div className="bg-card rounded-lg p-4 border">
        <div className="text-2xl font-bold">{totalCategories}</div>
        <div className="text-sm text-muted-foreground">Categories</div>
      </div>
      <div className="bg-card rounded-lg p-4 border">
        <div className="text-2xl font-bold">{highPriorityLinks}</div>
        <div className="text-sm text-muted-foreground">High Priority</div>
      </div>
      <div className="bg-card rounded-lg p-4 border">
        <div className="text-2xl font-bold">{uniqueTags}</div>
        <div className="text-sm text-muted-foreground">Unique Tags</div>
      </div>
    </div>
  );
};
