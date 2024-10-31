import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardTitle from "@/components/BoardTitle";
import AddNewList from "@/components/AddNewList";
import ListCard from "@/components/ListCard";
import BoardListItem from "@/components/BoardListItems";
import {
  DndContext,
  KeyboardSensor,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

const BoardPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [boardDetails, setBoardDetails] = useState(null);
  const [activeId, setActiveId] = useState(null);

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

    // If the board was not found, add it to the list
    if (!storedBoards.some((board) => board.id === updatedBoard.id)) {
      updatedBoards.push(updatedBoard);
    }

    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;

    return function (...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active);
  };

  const handleDragMove = throttle(
    (event) => {
      const { active, over } = event;
      // Handling card item swap with another card
      if (
        active &&
        over &&
        active.id !== over.id &&
        active.data.current.type === "card" &&
        over?.data?.current?.type === "card"
      ) {
        const activeListContainer = boardDetails.list.find((list) =>
          list.listCards.some((card) => card.id === active.id)
        );
        const overListContainer = boardDetails.list.find((list) =>
          list.listCards.some((card) => card.id === over.id)
        );
        if (!activeListContainer || !overListContainer) return;
        const activeListContainerIndex = boardDetails.list.findIndex(
          (list) => list.id === activeListContainer.id
        );
        const overListContainerIndex = boardDetails.list.findIndex(
          (list) => list.id === overListContainer.id
        );
        const activeCardItemIndex = activeListContainer.listCards.findIndex(
          (card) => card.id === active.id
        );
        const overCardItemIndex = overListContainer.listCards.findIndex(
          (card) => card.id === over.id
        );
        // In the same container
        if (activeListContainerIndex === overListContainerIndex) {
          const updatedCards = arrayMove(
            boardDetails.list[activeListContainerIndex].listCards,
            activeCardItemIndex,
            overCardItemIndex
          );
          const updatedBoard = {
            ...boardDetails,
            list: boardDetails.list.map((list, index) => {
              if (index === activeListContainerIndex) {
                return {
                  ...list,
                  listCards: updatedCards,
                };
              }
              return list;
            }),
          };
          setBoardDetails(updatedBoard);
        } else {
          //when in differetn containers
          const newItems = [...boardDetails.list];
          // Remove the card from the source list
          const [removedCardItem] = newItems[
            activeListContainerIndex
          ].listCards.splice(activeCardItemIndex, 1);
          // Insert the card into the target list
          newItems[overListContainerIndex].listCards.splice(
            overCardItemIndex,
            0,
            removedCardItem
          );
          const updatedBoard = {
            ...boardDetails,
            list: newItems,
          };
          setBoardDetails(updatedBoard);
        }
      }
      // handling card item drop into a container
      if (
        active &&
        over &&
        active.id !== over.id &&
        active.data.current.type === "card" &&
        over?.data?.current?.type === "list"
      ) {
        const activeListContainer = boardDetails.list.find((list) =>
          list.listCards.some((card) => card.id === active.id)
        );
        const overListContainer = boardDetails.list.find(
          (list) => list.id === over.id // Use the over id directly since it's a list
        );
        if (!activeListContainer || !overListContainer) return;
        const activeListContainerIndex = boardDetails.list.findIndex(
          (list) => list.id === activeListContainer.id
        );
        const overListContainerIndex = boardDetails.list.findIndex(
          (list) => list.id === overListContainer.id
        );
        const activeCardItemIndex = activeListContainer.listCards.findIndex(
          (card) => card.id === active.id
        );
        let newCardItems = [...boardDetails.list];
        const [removedCardItem] = newCardItems[
          activeListContainerIndex
        ].listCards.splice(activeCardItemIndex, 1);
        newCardItems[overListContainerIndex].listCards.push(removedCardItem);
        const updatedBoard = {
          ...boardDetails,
          list: newCardItems,
        };
        setBoardDetails(updatedBoard);
      }

      if (
        active &&
        over &&
        active.data.current.type === "list" &&
        over.data.current.type === "card"
      ) {
        const activeListContainerIndex = boardDetails.list.findIndex(
          (list) => list.id === active.id
        );

        const overCardContainer = boardDetails.list.find((list) =>
          list.listCards.some((card) => card.id === over.id)
        );

        if (!overCardContainer) return;

        const overListContainerIndex = boardDetails.list.findIndex(
          (list) => list.id === overCardContainer.id
        );

        // Swap the two lists
        const updatedLists = arrayMove(
          boardDetails.list,
          activeListContainerIndex,
          overListContainerIndex
        );

        const updatedBoard = {
          ...boardDetails,
          list: updatedLists,
        };

        setBoardDetails(updatedBoard);
      }
    },
    [300]
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over) return;

    const isCard = active.data.current.type === "card";
    const isList = active.data.current.type === "list";

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
    }

    //Handle Card Items Sorting
    else if (isCard) {
      if (over?.data?.current?.type === "card") {
        const activeListContainer = boardDetails.list.find((list) =>
          list.listCards.some((card) => card.id === active.id)
        );

        const overListContainer = boardDetails.list.find((list) =>
          list.listCards.some((card) => card.id === over.id)
        );

        if (!activeListContainer || !overListContainer) return;

        const activeListContainerIndex = boardDetails.list.findIndex(
          (list) => list.id === activeListContainer.id
        );

        const overListContainerIndex = boardDetails.list.findIndex(
          (list) => list.id === overListContainer.id
        );

        const activeCardItemIndex = activeListContainer.listCards.findIndex(
          (card) => card.id === active.id
        );

        const overCardItemIndex = overListContainer.listCards.findIndex(
          (card) => card.id === over.id
        );

        // In the same container
        if (activeListContainerIndex === overListContainerIndex) {
          const updatedCards = arrayMove(
            boardDetails.list[activeListContainerIndex].listCards,
            activeCardItemIndex,
            overCardItemIndex
          );

          const updatedBoard = {
            ...boardDetails,
            list: boardDetails.list.map((list, index) => {
              if (index === activeListContainerIndex) {
                return {
                  ...list,
                  listCards: updatedCards,
                };
              }
              return list;
            }),
          };

          setBoardDetails(updatedBoard);
          updateLocalStorage(updatedBoard);
        } else {
          //when in differetn containers
          const newItems = [...boardDetails.list];

          // Remove the card from the source list
          const [removedCardItem] = newItems[
            activeListContainerIndex
          ].listCards.splice(activeCardItemIndex, 1);

          // Insert the card into the target list
          newItems[overListContainerIndex].listCards.splice(
            overCardItemIndex,
            0,
            removedCardItem
          );

          const updatedBoard = {
            ...boardDetails,
            list: newItems,
          };

          setBoardDetails(updatedBoard);
          updateLocalStorage(updatedBoard);
        }
      }

      //Handle Card Items Dropping to a List Container
      if (over?.data?.current?.type === "list") {
        const activeListContainer = boardDetails.list.find((list) =>
          list.listCards.some((card) => card.id === active.id)
        );

        const overListContainer = boardDetails.list.find(
          (list) => list.id === over.id // Use the over id directly since it's a list
        );

        if (!activeListContainer || !overListContainer) return;

        const activeListContainerIndex = boardDetails.list.findIndex(
          (list) => list.id === activeListContainer.id
        );

        const overListContainerIndex = boardDetails.list.findIndex(
          (list) => list.id === overListContainer.id
        );

        const activeCardItemIndex = activeListContainer.listCards.findIndex(
          (card) => card.id === active.id
        );

        let newCardItems = [...boardDetails.list];

        const [removedCardItem] = newCardItems[
          activeListContainerIndex
        ].listCards.splice(activeCardItemIndex, 1);

        newCardItems[overListContainerIndex].listCards.push(removedCardItem);

        const updatedBoard = {
          ...boardDetails,
          list: newCardItems,
        };

        setBoardDetails(updatedBoard);
        updateLocalStorage(updatedBoard);
      }
    }

    setActiveId(null);
  };

  const findCardById = (board, cardId) => {
    for (const list of board.list) {
      const card = list.listCards.find((card) => card.id === cardId);
      if (card) {
        return card;
      }
    }
    return null;
  };

  const findListById = (board, listId) => {
    return board.list.find((list) => list.id === listId) || null;
  };

  if (!boardDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BoardTitle boardDetails={boardDetails} />
      <div className="p-5 flex gap-3 flex-wrap items-start">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={boardDetails.list.map((i) => i.id)}
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
          <DragOverlay adjustScale={false}>
            {activeId && activeId.data.current.type === "card" && (
              <ListCard card={findCardById(boardDetails, activeId.id)} />
            )}

            {activeId && activeId.data.current.type === "list" && (
              <BoardListItem
                listItem={findListById(boardDetails, activeId.id)}
              />
            )}
          </DragOverlay>
        </DndContext>
        <AddNewList handleAddList={handleAddList} />
      </div>
    </div>
  );
};

export default BoardPage;

[
  {
    id: 1729684103399,
    list: [
      {
        id: 1730360772399,
        listName: "List 1",
        listCards: [
          { id: 1730360783471, cardName: "1 A" },
          { id: 1730360786294, cardName: "1 B" },
          { id: 1730360789750, cardName: "1 C" },
          { id: 1730360792566, cardName: "1 D" },
        ],
      },
      {
        id: 1730360775695,
        listName: "List 2",
        listCards: [
          { id: 1730360795998, cardName: "2 A" },
          { id: 1730360798782, cardName: "2 B" },
          { id: 1730360801054, cardName: "2 C" },
        ],
      },
      { id: 1730360779159, listName: "List 3", listCards: [] },
    ],
    backgroundImage:
      "linear-gradient(90deg, rgba(149,0,217,1) 0%, rgba(238,80,255,1) 100%)",
    boardTitle: "Daily Tasks",
    visibility: "workspace",
  },
];
