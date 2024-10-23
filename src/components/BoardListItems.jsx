import React, { useState } from "react";
import { Ellipsis, Plus, GalleryVerticalEnd, X, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ListCard from "@/components/ListCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BoardListItem = ({
  listItem,
  handleAddCardClick,
  handleDeleteList,
  handleDeleteListCard,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isAddCardClicked, setIsAddCardClicked] = useState(false);
  const [cardName, setCardName] = useState("");

  const handleSubmit = () => {
    setCardName("");
    setIsAddCardClicked(false);

    handleAddCardClick(cardName, listItem.id);
  };

  const handleSubmitDeleteList = () => {
    setIsPopoverOpen(false);
    handleDeleteList(listItem.id);
  };

  const handleCardDelete = (cardId) => {
    handleDeleteListCard(listItem.id, cardId);
  };

  return (
    <div className="w-72 rounded-md bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-70 px-2 py-4 space-y-3">
      <div className="px-2 flex justify-between items-center">
        <h1 className="text-sm font-bold">{listItem.listName}</h1>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger>
            <Ellipsis className="h-6 w-6 p-1 rounded-sm transition-all hover:bg-muted" />
          </PopoverTrigger>
          <PopoverContent align="start" sideOffset={30}>
            <div
              className="flex items-center gap-3 text-red-500 w-full rounded-sm hover:bg-muted cursor-pointer p-2 hover:text-red-600"
              onClick={handleSubmitDeleteList}
            >
              <Trash className="w-4 h-4 " />
              <p className="leading-none text-sm">Delete list</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        {listItem?.listCards?.map((card, index) => (
          <ListCard
            key={index}
            card={card}
            handleCardDelete={handleCardDelete}
          />
        ))}
      </div>

      {isAddCardClicked ? (
        <div className="bg-background px-2 py-3 rounded-md space-y-3">
          <Input
            placeholder="Enter a title or paste a link"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Button className={cn("p-2")} onClick={handleSubmit}>
              Add Card
            </Button>
            <Button
              className={cn("p-2")}
              variant="ghost"
              onClick={() => setIsAddCardClicked(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full gap-2">
          <Button
            className={cn(
              "p-2 flex items-center gap-2 flex-grow justify-start dark:hover:bg-muted-foreground"
            )}
            variant="ghost"
            onClick={() => setIsAddCardClicked(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Add a card</span>
          </Button>
          <Button
            className={cn("p-2 dark:hover:bg-muted-foreground")}
            variant="ghost"
          >
            <GalleryVerticalEnd className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BoardListItem;
