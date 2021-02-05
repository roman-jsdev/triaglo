import { useCallback, useEffect, useReducer } from "react";
import { BoardContext } from "./BoardContext";
import { boardReducer } from "./boardReducer";
import { useBoardId } from "../../hooks/useBoardId";
import { useDB } from "../../hooks/useDB";
import { useUserState } from "../UserContext/UserContext";
import { storage } from "../../utils";
import {
  addNewColumnAction,
  addNewTaskAction,
  addUserToBoardAction,
  fetchInitialStateAction,
  removeColumnAction,
  removeTaskAction,
  removeUserFromBoardAction,
  setColumnOrderAction,
  setColumnTitleAction,
  setNewBoardTitleAction,
  setNewColumnAction,
  setNewSameColumnAction,
  setTaskTitleAction,
} from "./boardActions";

export const BoardState = ({ children }) => {
  const [boardId] = useBoardId();
  const { addBoardToUser } = useUserState();
  const { userId, email } = storage() || { userId: null, email: null };

  const [boardState, dispatch] = useReducer(boardReducer, {
    owner: userId,
    isLoading: true,
    title: boardId,
  });

  const [getDB, isLoading, response] = useDB("get", `boards/${boardId}`);
  const [putToUserDB] = useDB("put", `users/${userId}/boards/${boardId}`, {
    owner: "notOwner",
  });
  const [putToBoardDB] = useDB("put", `boards/${boardId}`, boardState);

  useEffect(() => {
    if (response) putToBoardDB();
  }, [putToBoardDB]);

  const fetchInitialState = useCallback(() => {
    if (!response) getDB();
    if (!isLoading) {
      if (
        response.invited &&
        response.invited.includes(email) &&
        response.owner !== userId
      ) {
        addBoardToUser({ owner: "notOwner" });
        putToUserDB();
      }

      dispatch(fetchInitialStateAction(response));
    }
  }, [isLoading]);

  const setColumnOrder = (source, destination, draggableId) =>
    dispatch(
      setColumnOrderAction(boardState, source, destination, draggableId)
    );

  const setNewSameColumn = (start, source, destination, draggableId) =>
    dispatch(
      setNewSameColumnAction(
        boardState,
        start,
        source,
        destination,
        draggableId
      )
    );

  const setNewColumn = (start, finish, source, destination, draggableId) =>
    dispatch(
      setNewColumnAction(
        boardState,
        start,
        finish,
        source,
        destination,
        draggableId
      )
    );

  const addNewColumn = (title) =>
    dispatch(addNewColumnAction(boardState, title));

  const removeColumn = (id) => dispatch(removeColumnAction(boardState, id));

  const addNewTask = (columnId, content) =>
    dispatch(addNewTaskAction(boardState, columnId, content));

  const removeTask = (taskId, columnId) =>
    dispatch(removeTaskAction(boardState, taskId, columnId));

  const setColumnTitle = (columnId, title) =>
    dispatch(setColumnTitleAction(boardState, columnId, title));

  const setTaskTitle = (taskId, title) =>
    dispatch(setTaskTitleAction(boardState, taskId, title));

  const addUserToBoard = (email) =>
    dispatch(addUserToBoardAction(boardState, email));

  const removeUserFromBoard = (email) =>
    dispatch(removeUserFromBoardAction(boardState, email));

  const setNewBoardTitle = (title) => dispatch(setNewBoardTitleAction(title));

  return (
    <BoardContext.Provider
      value={{
        boardState,
        setColumnOrder,
        setNewSameColumn,
        setNewColumn,
        addNewColumn,
        removeColumn,
        addNewTask,
        removeTask,
        setColumnTitle,
        setTaskTitle,
        addUserToBoard,
        removeUserFromBoard,
        fetchInitialState,
        setNewBoardTitle,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
