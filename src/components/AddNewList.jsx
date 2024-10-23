import React from "react";
import { Plus } from "lucide-react";

const AddNewList = () => {
  return (
    <div className="w-64 h-12 rounded-lg px-4 gap-2 bg-white text-white cursor-pointer transition-all flex items-center bg-opacity-60 hover:bg-opacity-55">
      <Plus className="h-5 w-5" />
      <h1>Add another list</h1>
    </div>
  );
};

export default AddNewList;
