import React from "react";
import TrelloLogo from "../assets/trello-official-logo.svg";

import {
  Moon,
  Sun,
  Palette,
  Grip,
  ChevronDown,
  SearchIcon,
  Bell,
  CircleHelp,
  UserCircle2,
  ExternalLink,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import TrelloHelpImage from "@/assets/trello-help.png";
import { Link } from "react-router-dom";

const TopBar = () => {
  const { setTheme } = useTheme();
  return (
    <nav className="w-screen h-12 flex text-white items-center justify-between px-2 bg-black bg-opacity-20 dark:bg-opacity-80 ">
      <div className="h-full flex items-center gap-2">
        <Button
          variant="ghost"
          className={cn(
            "!h-8 p-[0.4rem] outline-none border-none focus:outline-none focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:invisible"
          )}
        >
          <Grip className="h-full" />
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "!h-8 px-2 outline-none border-none focus:outline-none focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:invisible"
          )}
        >
          <img src={TrelloLogo} className="h-full" alt="Trello Official Logo" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "!h-8 px-2 outline-none border-none focus:outline-none focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:invisible"
              )}
            >
              Workspaces <ChevronDown className="ml-1 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start"></DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "!h-8 px-2 outline-none border-none focus:outline-none focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:invisible"
              )}
            >
              Recent <ChevronDown className="ml-1 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start"></DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "!h-8 px-2 outline-none border-none focus:outline-none focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:invisible"
              )}
            >
              Starred <ChevronDown className="ml-1 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start"></DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "!h-8 px-2 outline-none border-none focus:outline-none focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:invisible"
              )}
            >
              Templates <ChevronDown className="ml-1 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start"></DropdownMenuContent>
        </DropdownMenu>

        <Button variant="default" className={cn("!h-8 px-3 dark:text-white")}>
          Create
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-[15rem] focus-within:w-[30rem] transition-all duration-700">
          <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 w-[1.10rem]" />
          <input
            className="w-full placeholder-white bg-transparent border-2 border-white rounded-sm pl-9 pr-3 py-[0.15rem] focus:outline-none focus:border-blue-500"
            placeholder="Search"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Bell className="cursor-pointer p-2 w-9 h-9 rotate-45 rounded-full hover:text-black dark:hover:text-white hover:bg-muted transition-all" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end"></DropdownMenuContent>
        </DropdownMenu>

        {/* Help Section Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CircleHelp className="cursor-pointer p-2 w-9 h-9 rounded-full hover:text-black dark:hover:text-white hover:bg-muted transition-all" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="pt-2 pb-3 w-96">
            <DropdownMenuGroup className={cn("pb-2")}>
              <div className="w-full flex flex-col items-center space-y-3">
                <div className="w-full flex flex-col items-center space-y-3 transition-all cursor-pointer py-4 px-3 rounded-md hover:bg-muted ">
                  <img
                    src={TrelloHelpImage}
                    alt="Trello Help Image"
                    className="w-[22rem]"
                  />
                  <h5 className="font-bold text-lg text-center">
                    Make boards more powerful with Trello Power-Ups
                  </h5>
                </div>
                <Link
                  to={"#"}
                  className="text-primary hover:underline transition-all"
                >
                  Get a new tip
                </Link>
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div className="flex justify-center flex-wrap">
                <Button variant="ghost">Pricing</Button>
                <Button variant="ghost">Apps</Button>
                <Button variant="ghost">Blog</Button>
                <Button variant="ghost">Privacy</Button>
                <Button variant="ghost">Notice and Collection</Button>
                <Button variant="ghost">More...</Button>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Section Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserCircle2 className="cursor-pointer p-2 w-9 h-9 rounded-full hover:text-black dark:hover:text-white hover:bg-muted transition-all" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="pt-4 pb-3 w-64">
            <DropdownMenuGroup>
              <DropdownMenuLabel>ACCOUNT</DropdownMenuLabel>
              <div className="flex items-center pl-1 pr-3 gap-2 my-3">
                <UserCircle2 className="box-border w-9 h-9" />
                <div className="box-border">
                  <h4 className="text-sm">Orgha Tomal Roy</h4>
                  <p className="text-xs">orgha.tomal@welldev.io</p>
                </div>
              </div>
              <DropdownMenuItem>Switch accounts</DropdownMenuItem>
              <DropdownMenuItem
                className={cn("flex items-center justify-between")}
              >
                <span>Manage account</span>
                <ExternalLink className="h-4" />
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel>TRELLO</DropdownMenuLabel>
              <DropdownMenuItem>Profile and visibility</DropdownMenuItem>
              <DropdownMenuItem>Activity</DropdownMenuItem>
              <DropdownMenuItem>Cards</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  className={cn("flex items-center gap-2")}
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                  <span>Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => setTheme("light")}
                      className={cn("flex items-center gap-2")}
                    >
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTheme("dark")}
                      className={cn("flex items-center gap-2")}
                    >
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTheme("system")}
                      className={cn("flex items-center gap-2")}
                    >
                      <Palette className="h-4 w-4" />
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className={cn("flex items-center justify-between")}
              >
                <span>Create Workspace</span>
                <UsersRound className="h-4 w-4" />
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>Shortcuts</DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default TopBar;
