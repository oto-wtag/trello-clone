import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ListCard = ({ card, handleCardDelete }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSubmitDeleteCard = () => {
    setIsPopoverOpen(false);
    handleCardDelete(card.id);
  };

  return (
    <div className="w-full bg-background rounded-md text-sm font-semibold flex items-start gap-3 hover:cursor-pointer hover:outline hover:outline-2 hover:outline-black dark:hover:outline-white">
      <div className="flex-grow p-3">
        <h1>{card.cardName}</h1>
      </div>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          <div className="p-2 hover:bg-muted rounded-full m-1">
            <Pencil className="w-4 h-4 " />
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" sideOffset={30}>
          <div
            className="flex items-center gap-3 text-red-500 w-full rounded-sm hover:bg-muted cursor-pointer p-2 hover:text-red-600"
            onClick={handleSubmitDeleteCard}
          >
            <Trash className="w-4 h-4 " />
            <p className="leading-none text-sm">Delete card</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ListCard;
