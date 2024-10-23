import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Trello,
  UserRound,
  Plus,
  Settings,
  ChevronDown,
  Table,
  CalendarDays,
  Ellipsis,
  Star,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import NewBoardEntry from "@/components/NewBoardEntry";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const existingBoardsJSON = localStorage.getItem("boards");
    if (existingBoardsJSON) {
      const existingBoards = JSON.parse(existingBoardsJSON);
      setBoards(existingBoards);
    }
  }, []);

  const handleClearData = () => {
    localStorage.removeItem("boards");
    setBoards([]);
    navigate("/");
  };

  return (
    <aside className="text-white h-[calc(100vh-48px)] w-72 flex flex-col">
      {/* Top Section */}

      <div className="min-h-20 flex items-center justify-between px-4 py-2 gap-3">
        <div className="flex gap-3 items-center">
          <div className="h-8 w-8 rounded-sm bg-blue-600 flex items-center justify-center flex-shrink-0">
            <h1 className="font-bold cursor-pointer text-white">O</h1>
          </div>
          <div className="">
            <h1 className="font-bold text-sm text-white">
              <span className="cursor-pointer ">Orgha Roy</span>
              's workspace
            </h1>
            <p className="text-xs text-white">Free</p>
          </div>
        </div>
        <ChevronLeft className="h-8 w-8 p-[0.35rem] flex-shrink-0 cursor-pointer hover:bg-muted-foreground rounded-md text-white" />
      </div>

      {/* Middle main section */}

      <div className="flex-1 overflow-y-auto mt-4 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 px-4 py-1 h-7 cursor-pointer hover:bg-muted-foreground">
            <Trello className="h-4 w-4" />
            <h4 className="text-sm flex-1">Boards</h4>
          </div>

          <div className="flex items-center gap-3 px-4 py-1 h-7 cursor-pointer hover:bg-muted-foreground">
            <UserRound className="h-4 w-4" />
            <h4 className="text-sm flex-1">Member</h4>
            <Plus className="h-6 w-6 p-1 rounded-sm transition-all hover:bg-muted" />
          </div>

          <div className="flex items-center gap-3 px-4 py-1 h-7 cursor-pointer hover:bg-muted-foreground">
            <Settings className="h-4 w-4" />
            <h4 className="text-sm flex-1">Workspace Settings</h4>
            <ChevronDown className="h-6 w-6 p-1 rounded-sm transition-all hover:bg-muted" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="ml-4 font-bold text-sm pb-1">Workspace views</h1>

          <div className="flex items-center gap-3 px-4 py-1 h-7 cursor-pointer hover:bg-muted-foreground group">
            <Table className="h-4 w-4" />
            <h4 className="text-sm flex-1 italic">Table</h4>
            <Ellipsis className="h-6 w-6 p-1 rounded-sm transition-all hidden hover:bg-muted group-hover:inline-block" />
          </div>

          <div className="flex items-center gap-3 px-4 py-1 h-7 cursor-pointer hover:bg-muted-foreground group">
            <CalendarDays className="h-4 w-4" />
            <h4 className="text-sm flex-1 italic">Calendar</h4>
            <Ellipsis className="h-6 w-6 p-1 rounded-sm transition-all hidden hover:bg-muted group-hover:inline-block" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3 px-4 py-1 h-7 cursor-pointer group">
            <h4 className="text-sm flex-1 font-bold">Your boards</h4>
            <Ellipsis className="h-6 w-6 p-1 rounded-sm transition-all hidden hover:bg-muted group-hover:inline-block" />
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger>
                <Plus className="h-6 w-6 p-1 rounded-sm transition-all hover:bg-muted" />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={30}
                className={cn("w-[22rem]")}
              >
                <NewBoardEntry
                  boards={boards}
                  setBoards={setBoards}
                  setIsPopoverOpen={setIsPopoverOpen}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* list of baords */}
          {boards.map((board) => (
            <Link
              to={`/b/${board.id}`}
              key={board.id}
              className="flex items-center gap-3 px-4 py-1 h-7 cursor-pointer hover:bg-muted-foreground group"
            >
              <div
                className="h-5 w-5 rounded-sm flex-shrink-0"
                style={{
                  background: `${board.backgroundImage} center / cover`,
                }}
              ></div>
              <h4 className="text-sm flex-1 truncate">{board.boardTitle}</h4>
              <Ellipsis className="h-6 w-6 p-1 rounded-sm transition-all hidden hover:bg-muted group-hover:inline-block" />
              <Star className="h-6 w-6 p-1 rounded-sm transition-all hidden hover:scale-125 group-hover:inline-block" />
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Div */}

      <div className="px-4 py-2">
        <Button className={cn("w-full")} onClick={handleClearData}>
          Clear Data
        </Button>
      </div>
    </aside>
  );
};

export default SideBar;
