import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BoardTitle from "@/components/BoardTitle";
import AddNewList from "@/components/AddNewList";

const BoardPage = () => {
  const { id } = useParams();
  const [boardDetails, setBoardDetails] = useState(null);

  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem("boards") || "[]");
    const boardId = Number(id);
    const board = storedBoards.find((board) => board.id === boardId);

    if (board) {
      setBoardDetails(board);
    } else {
      console.error("Board not found");
    }
  }, [id]);

  return (
    <div>
      <BoardTitle boardDetails={boardDetails} />
      <div className="p-5 flex gap-5">
        <AddNewList />
        {/* <div className="w-64 h-14 rounded-md border"></div>
        <div className="w-64 h-14 rounded-md border"></div>
        <div className="w-64 h-14 rounded-md border"></div>
        <div className="w-64 h-14 rounded-md border"></div> */}
      </div>
    </div>
  );
};

export default BoardPage;
