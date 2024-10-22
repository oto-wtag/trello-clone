import React from "react";
import { Button } from "@/components/ui/button";
import {
  Star,
  Lock,
  Kanban,
  ChevronDown,
  Ellipsis,
  UserPlus2Icon,
  ListFilter,
  Zap,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BoardTitle = ({ boardDetails }) => {
  return (
    <div className="text-white w-full h-16 px-5 flex items-center justify-between bg-black bg-opacity-30 dark:bg-opacity-40">
      <div className="flex items-center gap-1">
        <Button variant="ghost" className={cn("text-lg font-bold")}>
          {boardDetails && boardDetails.boardTitle}
        </Button>
        <Button variant="ghost">
          <Star className="h-4 w-4" />
        </Button>
        <Button variant="ghost" className={cn("flex items-center gap-2")}>
          <Lock className="h-4 w-4" />
          <span>Private</span>
        </Button>
        <Button
          variant="outline"
          className={cn("flex items-center gap-2 text-black dark:text-white")}
        >
          <Kanban className="h-4 w-4" />
          <span>Board</span>
        </Button>
        <Button variant="ghost">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button variant="ghost" className={cn("flex items-center gap-2")}>
            <Rocket className="h-4 w-4" />
            <span>Power-up</span>
          </Button>
          <Button variant="ghost" className={cn("flex items-center gap-2")}>
            <Zap className="h-4 w-4" />
            <span>Automation</span>
          </Button>
          <Button variant="ghost" className={cn("flex items-center gap-2")}>
            <ListFilter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-white h-8 w-8 rounded-full"></div>
          <Button
            variant="outline"
            className={cn("flex items-center gap-2 text-black dark:text-white")}
          >
            <UserPlus2Icon className="h-4 w-4" />
            <span>Share</span>
          </Button>
          <Button variant="ghost">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BoardTitle;
