import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const AddNewList = ({ handleAddList }) => {
  const [isAddActive, setIsAddActive] = useState(false);
  const [listName, setListName] = useState("");

  const handleSubmit = () => {
    if (listName.trim()) {
      handleAddList(listName);
      setListName("");
      setIsAddActive(false);
    }
  };

  if (isAddActive) {
    return (
      <div className="w-72 bg-background p-4 rounded-lg space-y-3">
        <Input
          placeholder="Enter list name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <Button className="" onClick={handleSubmit}>
            Add list
          </Button>
          <Button
            className={cn("p-2")}
            variant="ghost"
            onClick={() => setIsAddActive(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsAddActive(true)}
      className="w-72 h-12 rounded-lg px-4 gap-2 bg-white text-white cursor-pointer transition-all flex items-center bg-opacity-60 hover:bg-opacity-55"
    >
      <Plus className="h-5 w-5" />
      <h1>Add another list</h1>
    </div>
  );
};

export default AddNewList;
