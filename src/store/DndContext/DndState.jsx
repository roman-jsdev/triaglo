import { useCallback, useEffect, useReducer } from "react";
import { DndContext } from "./DndContext";
import {
  SET_COLUMN_ORDER,
  SET_NEW_SAME_COLUMN,
  SET_NEW_COLUMN,
  ADD_NEW_COLUMN,
  REMOVE_COLUMN,
  ADD_NEW_TASK,
  REMOVE_TASK,
  SET_COLUMN_TITLE,
  SET_TASK_TITLE,
  ADD_USER_TO_BOARD,
  FETCH_INITIAL_STATE,
} from "../types";
import { dndReducer } from "./dndReducer";
import { useBoardId } from "../../hooks/useBoardId";
import { useDB } from "../../hooks/useDB";
import { useUserState } from "../UserContext/UserContext";

export const DndState = ({ children }) => {
  const [boardId] = useBoardId();

  const [getDB, isLoading, response] = useDB("get", `boards/${boardId}`);

  const boardObj = { board: "notOwner" };

  const [addBoard] = useDB(
    "put",
    `users/${sessionStorage.getItem("userId")}/boards/${boardId}`,
    boardObj
  );

  const [dndState, dispatch] = useReducer(dndReducer, {
    owner: sessionStorage.getItem("userId"),
    isLoading: true,
  });

  const { addBoardToUser } = useUserState();

  const [putDB] = useDB("put", `boards/${boardId}`, dndState);

  useEffect(() => {
    if  (response)  {
      putDB();
    }
  }, [putDB]);

  const fetchInitialState = useCallback(() => {
    if (!response) {
      getDB();
    }
    if (!isLoading) {
      if (
        response.invited &&
        response.invited.includes(sessionStorage.getItem("email"))
      ) {
        if (response.owner !== sessionStorage.getItem("userId")) {
          addBoardToUser({ board: "notOwner" });
          addBoard();
        }
      }

      dispatch({
        type: FETCH_INITIAL_STATE,
        payload: { ...response, isLoading: false },
      });
    }
  }, [isLoading]);

  const setColumnOrder = (source, destination, draggableId) => {
    const newColumnOrder = Array.from(dndState.columnOrder);
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, draggableId);
    dispatch({ type: SET_COLUMN_ORDER, payload: newColumnOrder });
  };

  const setNewSameColumn = (start, source, destination, draggableId) => {
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      taskIds: newTaskIds,
    };

    const payload = {
      ...dndState.columns,
      [newColumn.id]: newColumn,
    };
    dispatch({ type: SET_NEW_SAME_COLUMN, payload });
  };

  const setNewColumn = (start, finish, source, destination, draggableId) => {
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const payload = {
      ...dndState.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };
    dispatch({ type: SET_NEW_COLUMN, payload });
  };

  const addNewColumn = (value) => {
    const id = Date.now();
    const newColumn = {
      [`column-${id}`]: {
        id: `column-${id}`,
        title: value,
        taskIds: [],
      },
    };
    const newOrder = [...dndState.columnOrder];
    newOrder.push(`column-${id}`);
    const payload = {
      columns: {
        ...dndState.columns,
        ...newColumn,
      },
      order: newOrder,
    };
    dispatch({ type: ADD_NEW_COLUMN, payload });
  };

  const removeColumn = (id) => {
    const currentColumns = dndState.columns;
    const currentOrder = dndState.columnOrder;

    const filteredColumns = Object.keys(currentColumns)
      .filter((key) => key !== id)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: currentColumns[key],
        };
      }, {});

    const filteredOrder = [...currentOrder.filter((e) => e !== id)];

    const currentTasks = { ...dndState.tasks };
    const deletingTasks = [...currentColumns[id]["taskIds"]];

    const filteredTasks = Object.keys(currentTasks)
      .filter((key) => !deletingTasks.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: currentTasks[key],
        };
      }, {});

    const payload = {
      tasks: filteredTasks,
      columns: filteredColumns,
      order: filteredOrder,
    };
    dispatch({ type: REMOVE_COLUMN, payload });
  };

  const addNewTask = (columnId, value) => {
    const id = Date.now();
    const newTask = {
      [`task-${id}`]: {
        id: `task-${id}`,
        content: value,
      },
    };

    const currentColumns = { ...dndState.columns };
    const currentColumnsArray = currentColumns[columnId]["taskIds"];
    currentColumnsArray.push(`task-${id}`);

    const payload = {
      tasks: {
        ...dndState.tasks,
        ...newTask,
      },
      columns: currentColumns,
    };

    dispatch({ type: ADD_NEW_TASK, payload });
  };

  const removeTask = (taskId, columnId) => {
    const currentTasks = dndState.tasks;
    const currentColumns = { ...dndState.columns };

    const filteredTasks = Object.keys(currentTasks)
      .filter((key) => key !== taskId)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: currentTasks[key],
        };
      }, {});
    const currentColumnsArray = currentColumns[columnId]["taskIds"];
    const taskIndex = currentColumnsArray.indexOf(taskId);
    currentColumnsArray.splice(taskIndex, 1);

    const payload = {
      tasks: {
        ...filteredTasks,
      },
      columns: currentColumns,
    };

    dispatch({ type: REMOVE_TASK, payload });
  };

  const setColumnTitle = (columnId, value) => {
    const currentColumns = dndState.columns;
    currentColumns[columnId].title = value;
    const payload = currentColumns;

    dispatch({ type: SET_COLUMN_TITLE, payload });
  };

  const setTaskTitle = (taskId, value) => {
    const currentTasks = dndState.tasks;
    currentTasks[taskId].content = value;
    const payload = currentTasks;

    dispatch({ type: SET_TASK_TITLE, payload });
  };

  const addUserToBoard = (email) => {
    const currentInvited = [...dndState.invited];
    const invited = [...currentInvited, email];
    dispatch({ type: ADD_USER_TO_BOARD, payload: invited });
  };

  const removeUserFromBoard = (email) => {
    const currentInvited = [...dndState.invited];
    const invited = currentInvited.filter((e) => e !== email);
    dispatch({ type: ADD_USER_TO_BOARD, payload: invited });
  };

  return (
    <DndContext.Provider
      value={{
        dndState,
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
      }}
    >
      {children}
    </DndContext.Provider>
  );
};
