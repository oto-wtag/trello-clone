import React from "react";
import { Pencil } from "lucide-react";

const ListCard = ({ card }) => {
  return (
    <div className="w-full bg-background rounded-md text-sm font-semibold flex items-start gap-3 hover:cursor-pointer hover:outline hover:outline-2 hover:outline-black dark:hover:outline-white">
      <div className="flex-grow p-3">
        <h1>{card.cardName}</h1>
      </div>
      <div className="p-2 hover:bg-muted rounded-full m-1">
        <Pencil className="w-4 h-4 " />
      </div>
    </div>
  );
};

export default ListCard;
