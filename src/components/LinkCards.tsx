
import { Link } from "@/pages/Index";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, MoreHorizontal, Edit, Trash2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface LinkCardsProps {
  links: Link[];
  onUpdateLink: (id: string, updates: Partial<Link>) => void;
  onDeleteLink: (id: string) => void;
}

export const LinkCards = ({ links, onUpdateLink, onDeleteLink }: LinkCardsProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const handleLinkClick = (link: Link) => {
    onUpdateLink(link.id, { lastAccessed: new Date() });
    window.open(link.url, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((link) => (
        <Card key={link.id} className="group hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <button
                onClick={() => handleLinkClick(link)}
                className="font-semibold text-left hover:text-primary transition-colors flex items-center gap-2 group/link flex-1"
              >
                <span className="line-clamp-2">{link.title}</span>
                <ExternalLink className="h-4 w-4 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleLinkClick(link)}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Link
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDeleteLink(link.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {link.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {link.description}
              </p>
            )}
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {link.category}
              </Badge>
              <Badge variant={getPriorityColor(link.priority) as any} className="text-xs">
                {link.priority}
              </Badge>
            </div>
            
            {link.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {link.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {link.notes && (
              <p className="text-xs text-muted-foreground italic border-l-2 border-muted pl-2">
                {link.notes}
              </p>
            )}
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Added {formatDistanceToNow(new Date(link.dateAdded), { addSuffix: true })}
            </div>
            
            <div className="text-xs text-muted-foreground truncate">
              {link.url}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
