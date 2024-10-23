import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BoardTitle from "@/components/BoardTitle";
import AddNewList from "@/components/AddNewList";
import BoardListItem from "@/components/BoardListItems";

const BoardPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [boardDetails, setBoardDetails] = useState(null);

  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem("boards") || "[]");
    const boardId = Number(id);
    const board = storedBoards.find((board) => board.id === boardId);

    if (board) {
      setBoardDetails(board);
    } else {
      navigate("/");
    }
  }, [id]);

  const handleAddList = (listName) => {
    if (listName && boardDetails) {
      const newList = {
        id: Date.now(),
        listName,
        listCards: [],
      };

      const updatedBoard = {
        ...boardDetails,
        list: [...boardDetails.list, newList],
      };

      setBoardDetails(updatedBoard);

      const storedBoards = JSON.parse(localStorage.getItem("boards") || "[]");

      const updatedBoards = storedBoards.map((board) =>
        board.id === boardDetails.id ? updatedBoard : board
      );

      localStorage.setItem("boards", JSON.stringify(updatedBoards));
    } else {
      alert("Error Creating List");
    }
  };

  const handleAddCardClick = (cardName, listId) => {
    if (cardName.trim() === "") return;
    const card = {
      id: Date.now(),
      cardName,
    };

    const updatedBoard = { ...boardDetails };

    updatedBoard.list = updatedBoard.list.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          listCards: [...list.listCards, card],
        };
      }
      return list;
    });

    setBoardDetails(updatedBoard);

    const storedBoards = JSON.parse(localStorage.getItem("boards") || "[]");

    const updatedBoards = storedBoards.map((board) =>
      board.id === updatedBoard.id ? updatedBoard : board
    );

    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  const handleDeleteList = (listId) => {
    const updatedBoard = {
      ...boardDetails,
      list: boardDetails.list.filter((list) => list.id !== listId), // Filter out the list to delete
    };

    setBoardDetails(updatedBoard);

    const storedBoards = JSON.parse(localStorage.getItem("boards") || "[]");

    const updatedBoards = storedBoards.map((board) =>
      board.id === updatedBoard.id ? updatedBoard : board
    );

    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  const handleDeleteListCard = (listId, cardId) => {
    const updatedBoard = {
      ...boardDetails,
      list: boardDetails.list.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            listCards: list.listCards.filter((card) => card.id !== cardId),
          };
        }
        return list;
      }),
    };

    setBoardDetails(updatedBoard);

    const storedBoards = JSON.parse(localStorage.getItem("boards") || "[]");

    const updatedBoards = storedBoards.map((board) =>
      board.id === updatedBoard.id ? updatedBoard : board
    );

    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  return (
    <div>
      <BoardTitle boardDetails={boardDetails} />
      <div className="p-5 flex gap-3 flex-wrap items-start">
        {boardDetails?.list?.map((listItem, index) => (
          <BoardListItem
            key={index}
            listItem={listItem}
            handleAddCardClick={handleAddCardClick}
            handleDeleteList={handleDeleteList}
            handleDeleteListCard={handleDeleteListCard}
          />
        ))}
        <AddNewList handleAddList={handleAddList} />
      </div>
    </div>
  );
};

export default BoardPage;
