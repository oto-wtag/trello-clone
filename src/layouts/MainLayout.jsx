import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";

const MainLayout = () => {
  const { id } = useParams();
  const [background, setBackground] = useState("#84d5f5");

  useEffect(() => {
    if (id) {
      // Fetch boards from localStorage
      const existingBoardsJSON = localStorage.getItem("boards");
      let existingBoards = existingBoardsJSON
        ? JSON.parse(existingBoardsJSON)
        : [];

      // Find the board with the matching id
      const selectedBoard = existingBoards.find(
        (board) => board.id.toString() === id
      );

      if (selectedBoard) {
        // Set the background image from the selected board
        setBackground(selectedBoard.backgroundImage);
      }
    }
  }, [id]);

  return (
    <div
      className="relative"
      style={{
        background: `${background} center / cover`,
      }}
    >
      <TopBar />
      <div className="flex">
        <div className="flex-shrink bg-black bg-opacity-40 dark:bg-opacity-70 ">
          <SideBar />
        </div>
        <div className="w-full bg-black bg-opacity-0 dark:bg-opacity-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
