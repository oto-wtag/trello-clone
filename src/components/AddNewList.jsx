import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddNewList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newListName, setNewListName] = useState("");

  const handleAddClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setNewListName(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && newListName.trim()) {
      // Here you would typically add the new list to your state or context
      console.log("New list added:", newListName);
      setNewListName(""); // Reset input
      setIsEditing(false); // Exit editing mode
    } else if (e.key === "Escape") {
      setIsEditing(false); // Exit editing mode without saving
      setNewListName(""); // Reset input
    }
  };

  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        className="w-64 h-12 rounded-lg px-4 gap-2 bg-white text-white cursor-pointer transition-all flex items-center bg-opacity-60 hover:bg-opacity-55"
      >
        <Plus className="h-5 w-5" />
        <h1>Add another list</h1>
      </div>
    );
  }

  return (
    <div className="w-64 px-4 bg-background rounded-lg">
      <Input />
      <Button onClick={setIsEditing(!isEditing)}>Cancel</Button>
    </div>
  );
};

export default AddNewList;

//palak siam susmoy ashfaq
