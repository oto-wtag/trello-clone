import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis, Check } from "lucide-react";
import { Input } from "@/components/ui/input";

import cave from "@/assets/bg-images/cave.jpg";
import dessert from "@/assets/bg-images/dessert.jpg";
import flower from "@/assets/bg-images/flower.jpg";
import hotAirBalloon from "@/assets/bg-images/hot-air-balloon.jpg";
import lighthouse from "@/assets/bg-images/lighthouse.jpg";
import milkyWay from "@/assets/bg-images/milky-way.jpg";

import NewBoardEntryColorSelector from "@/components/NewBoardEntryColorSelector";

const NewBoardEntry = ({ boards, setBoards, setIsPopoverOpen }) => {
  const [formValues, setFormValues] = useState({
    backgroundImage: "#07b335",
    boardTitle: "",
    visibility: "workspace",
  });

  const [titleError, setTitleError] = useState("");

  const TITLE_ERRORS = {
    REQUIRED_FIELD: "👋  Board title is required",
    TAKEN_TITLE: "👋  Board title already taken",
  };

  const pictures = [cave, dessert, flower, hotAirBalloon, lighthouse, milkyWay];

  const colors = [
    "#07b335",
    "#de921f",
    "#f781b6",
    "linear-gradient(90deg, rgba(149,0,217,1) 0%, rgba(238,80,255,1) 100%)",
    "linear-gradient(39deg, rgba(0,217,153,1) 0%, rgba(186,255,80,1) 100%)",
    "linear-gradient(151deg, rgba(217,29,0,1) 0%, rgba(255,188,80,1) 100%)",
  ];

  const handleVisibilitySelect = (value) => {
    setFormValues((prev) => ({
      ...prev,
      visibility: value,
    }));
  };

  const handleInputChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      boardTitle: e.target.value,
    }));

    setTitleError(e.target.value === "" ? TITLE_ERRORS.REQUIRED_FIELD : "");
  };

  const handleTitleFocus = () => {
    if (!formValues.boardTitle) {
      setTitleError(TITLE_ERRORS.REQUIRED_FIELD);
    } else {
      setTitleError("");
    }
  };

  const handleSubmit = () => {
    const newBoard = { id: Date.now(), ...formValues };

    // Check if the board title is already taken
    const isTitleTaken = boards.some(
      (board) => board.boardTitle === newBoard.boardTitle
    );

    if (isTitleTaken) {
      // Handle the case where the board title is already taken (e.g., show an error)
      setTitleError(TITLE_ERRORS.TAKEN_TITLE);
      return; // Exit the function
    }

    // Add the new board to the existing array
    const updatedBoards = [newBoard, ...boards];

    // Update local storage
    localStorage.setItem("boards", JSON.stringify(updatedBoards));

    // Update the boards state
    setBoards(updatedBoards);

    // Close the popover
    setIsPopoverOpen(false);
  };

  return (
    <div className="py-2">
      <h1 className="mb-4 text-center font-bold text-sm">Create Board</h1>

      <Separator />

      <div className="flex flex-col items-center mt-6 px-1 text-start space-y-5 ">
        {/* Picture Frame */}
        <div
          className="w-10/12 h-32 rounded-sm grid grid-cols-3 p-4 gap-3"
          style={{
            background: `${formValues.backgroundImage} center / cover`,
          }}
        >
          <div className="h-10 w-full bg-white rounded-sm opacity-90"></div>
          <div className="h-24 w-full bg-white rounded-sm opacity-90"></div>
          <div className="h-14 w-full bg-white rounded-sm opacity-90"></div>
        </div>

        {/* Select Background Section */}
        <div className="w-full text-sm font-bold space-y-2">
          <h4>Background</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-between">
              {pictures.slice(0, 4).map((picture, index) => (
                <div
                  key={index}
                  className={`h-9 flex-1 border rounded-sm cursor-pointer transition-all hover:opacity-70 flex items-center justify-center ${
                    formValues.backgroundImage === `url('${picture}')`
                      ? "opacity-70"
                      : "opacity-100"
                  } `}
                  style={{
                    background: `url("${picture}") center / cover`,
                  }}
                  onClick={() =>
                    setFormValues((prev) => ({
                      ...prev,
                      backgroundImage: `url('${picture}')`,
                    }))
                  }
                >
                  <Check
                    className={`h-5 w-5 ${
                      formValues.backgroundImage === `url('${picture}')`
                        ? "inline-block"
                        : "hidden"
                    } `}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-between">
              {colors.slice(0, 5).map((color, index) => (
                <div
                  key={index}
                  className={`h-9 flex-1 border rounded-sm cursor-pointer hover:opacity-70 transition-all flex items-center justify-center ${
                    color === formValues.backgroundImage
                      ? "opacity-70"
                      : "opacity-100"
                  }`}
                  style={{ background: color }}
                  onClick={() =>
                    setFormValues((prev) => ({
                      ...prev,
                      backgroundImage: color,
                    }))
                  }
                >
                  <Check
                    className={`h-5 w-5 ${
                      color === formValues.backgroundImage
                        ? "inline-block"
                        : "hidden"
                    }`}
                  />
                </div>
              ))}
              <div className="h-9 flex-1 border rounded-sm cursor-pointer flex items-center justify-center transition-all hover:bg-muted">
                <Popover>
                  <PopoverTrigger>
                    <Ellipsis className="h-5 w-5" />
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    sideOffset={30}
                    className={cn("w-80")}
                  >
                    <NewBoardEntryColorSelector
                      colors={colors}
                      pictures={pictures}
                      formValues={formValues}
                      setFormValues={setFormValues}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        {/* Board Title Section */}
        <div className="w-full space-y-2">
          <h4 className="text-sm font-bold ">
            Board title {titleError && <span className="text-red-600">*</span>}
          </h4>
          <Input
            placeholder="Title"
            value={formValues.boardTitle}
            onFocus={handleTitleFocus}
            onChange={handleInputChange}
            className={titleError && "!border-red-600 focus:!ring-0"}
          />
          {titleError && <p className="text-sm">{titleError}</p>}
        </div>

        {/* Board Visibility Section */}
        <div className="w-full space-y-2">
          <h4 className="text-sm font-bold ">Visibility</h4>
          <Select
            onValueChange={handleVisibilitySelect}
            defaultValue={formValues.visibility}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="workspace">Workspace</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Workspace Information Section */}
        <p className="text-sm text-">
          This Workspace has 7 boards remaining. Free Workspaces can only have
          10 open boards. For unlimited boards, upgrade your Workspace.
        </p>

        {/* Buttons Sections */}
        <div className="space-y-2">
          <Button className={cn("w-full")}>Start free trial</Button>
          <Button
            className={cn("w-full")}
            disabled={!formValues.boardTitle || titleError}
            onClick={handleSubmit}
          >
            Create
          </Button>
          <Button className={cn("w-full")}>Start with a template</Button>
        </div>

        {/* Footer Section */}
        <p className="text-[13px]">
          By using images from Unsplash, you agree to their{" "}
          <span className="cursor-pointer hover:underline">License</span> and{" "}
          <span className="cursor-pointer hover:underline">
            Terms of Service
          </span>
        </p>
      </div>
    </div>
  );
};

export default NewBoardEntry;
