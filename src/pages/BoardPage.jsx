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
  const [listDetails, setListDetails] = useState([]);

  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem("boards") || "[]");
    const boardId = Number(id);
    const board = storedBoards.find((board) => board.id === boardId);

    if (board) {
      setBoardDetails(board);
      setListDetails(board.list || []);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  useEffect(() => {
    if (boardDetails) {
      setListDetails(boardDetails.list || []);
    }
  }, [boardDetails]);

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
      updateLocalStorage(updatedBoard);
    } else {
      alert("Error Creating List");
    }
  };

  const handleCardUpdate = (updatedCardList, listId) => {
    const updatedBoard = {
      ...boardDetails,
      list: boardDetails.list.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            listCards: updatedCardList,
          };
        }
        return list;
      }),
    };

    setBoardDetails(updatedBoard);
    updateLocalStorage(updatedBoard);
  };

  const handleDeleteList = (listId) => {
    const updatedBoard = {
      ...boardDetails,
      list: boardDetails.list.filter((list) => list.id !== listId), // Filter out the list to delete
    };

    setBoardDetails(updatedBoard);
    updateLocalStorage(updatedBoard);
  };

  const updateLocalStorage = (updatedBoard) => {
    const storedBoards = JSON.parse(localStorage.getItem("boards") || "[]");

    const updatedBoards = storedBoards.map((board) =>
      board.id === updatedBoard.id ? updatedBoard : board
    );

    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  if (!boardDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BoardTitle boardDetails={boardDetails} />
      <div className="p-5 flex gap-3 flex-wrap items-start">
        {listDetails &&
          listDetails.map((listItem) => (
            <BoardListItem
              key={listItem.id}
              listItem={listItem}
              handleDeleteList={handleDeleteList}
              handleCardUpdate={handleCardUpdate}
            />
          ))}
        <AddNewList handleAddList={handleAddList} />
      </div>
    </div>
  );
};

export default BoardPage;
