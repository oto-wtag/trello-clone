import React, { useState } from "react";
import { Ellipsis, Plus, GalleryVerticalEnd, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ListCard from "@/components/ListCard";

const BoardListItem = ({ listItem, handleAddCardClick }) => {
  const [isAddCardClicked, setIsAddCardClicked] = useState(false);
  const [cardName, setCardName] = useState("");

  const handleSubmit = () => {
    setCardName("");
    setIsAddCardClicked(false);

    handleAddCardClick(cardName, listItem.id);
  };

  return (
    <div className="w-72 rounded-md bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-70 px-2 py-4 space-y-3">
      <div className="px-2 flex justify-between items-center">
        <h1 className="text-sm font-bold">{listItem.listName}</h1>
        <Button
          variant="ghost"
          className={cn("p-2 dark:hover:bg-muted-foreground")}
        >
          <Ellipsis className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-2">
        {listItem?.listCards?.map((card, index) => (
          <ListCard key={index} card={card} />
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
