import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardTitle from "@/components/BoardTitle";
import AddNewList from "@/components/AddNewList";
import BoardListItem from "@/components/BoardListItems";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

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
  }, [id, navigate]);

  const handleAddList = (listName) => {
    if (listName && boardDetails) {
      const newList = {
        id: `l${Date.now()}`,
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
      list: boardDetails.list.filter((list) => list.id !== listId),
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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    const isCard = active.id.startsWith("c");
    const isList = active.id.startsWith("l");

    if (isList) {
      const oldIndex = boardDetails.list.findIndex(
        (list) => list.id === active.id
      );
      const newIndex = boardDetails.list.findIndex(
        (list) => list.id === over.id
      );

      const updatedList = arrayMove(boardDetails.list, oldIndex, newIndex);

      const updatedBoard = {
        ...boardDetails,
        list: updatedList,
      };

      setBoardDetails(updatedBoard);
      updateLocalStorage(updatedBoard);
    } else if (isCard) {
      const cardId = active.id;
      const overListId = over.id;
      const sourceList = boardDetails.list.find((list) =>
        list.listCards.some((card) => card.id === cardId)
      );

      if (sourceList) {
        const sourceListId = sourceList.id;
        if (overListId === sourceListId) return;

        const oldCardIndex = sourceList.listCards.findIndex(
          (card) => card.id === cardId
        );

        const targetList = boardDetails.list.find(
          (list) => list.id === overListId
        );

        if (targetList) {
          const updatedSourceCards = [...sourceList.listCards];
          const [movedCard] = updatedSourceCards.splice(oldCardIndex, 1);

          const updatedTargetCards = [...targetList.listCards, movedCard];

          const updatedLists = boardDetails.list.map((list) => {
            if (list.id === sourceList.id) {
              return { ...list, listCards: updatedSourceCards };
            }
            if (list.id === targetList.id) {
              return { ...list, listCards: updatedTargetCards };
            }
            return list;
          });

          const updatedBoard = {
            ...boardDetails,
            list: updatedLists,
          };

          setBoardDetails(updatedBoard);
          updateLocalStorage(updatedBoard);
        }
      }
    }
  };

  if (!boardDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BoardTitle boardDetails={boardDetails} />
      <div className="p-5 flex gap-3 flex-wrap items-start">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={boardDetails.list}
            strategy={horizontalListSortingStrategy}
          >
            {boardDetails.list &&
              boardDetails.list.map((listItem) => (
                <BoardListItem
                  key={listItem.id}
                  listItem={listItem}
                  handleDeleteList={handleDeleteList}
                  handleCardUpdate={handleCardUpdate}
                />
              ))}
          </SortableContext>
        </DndContext>
        <AddNewList handleAddList={handleAddList} />
      </div>
    </div>
  );
};

export default BoardPage;
