import { useReducer } from "react";
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
} from "../types";
import { dndReducer } from "./dndReducer";
import { initialData } from "../../initialData";

export const DndState = ({ children }) => {
  const [dndState, dispatch] = useReducer(dndReducer, initialData);

  const setColumnOrder = (newOrder) => {
    dispatch({ type: SET_COLUMN_ORDER, payload: newOrder });
  };

  const setNewSameColumn = (newColumn) => {
    const payload = {
      ...dndState.columns,
      [newColumn.id]: newColumn,
    };
    dispatch({ type: SET_NEW_SAME_COLUMN, payload: payload });
  };

  const setNewColumn = (newStart, newFinish) => {
    const payload = {
      ...dndState.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };
    dispatch({ type: SET_NEW_COLUMN, payload: payload });
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
    dispatch({ type: ADD_NEW_COLUMN, payload: payload });
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
    dispatch({ type: REMOVE_COLUMN, payload: payload });
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

    dispatch({ type: ADD_NEW_TASK, payload: payload });
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

    dispatch({ type: REMOVE_TASK, payload: payload });
  };

  const setColumnTitle = (columnId, value) => {
    const currentColumns = dndState.columns;
    currentColumns[columnId].title = value;
    const payload = currentColumns;

    dispatch({ type: SET_COLUMN_TITLE, payload: payload });
  };

  const setTaskTitle = (taskId, value) => {
    const currentTasks = dndState.tasks;
    currentTasks[taskId].content = value;
    const payload = currentTasks;

    dispatch({ type: SET_TASK_TITLE, payload: payload });
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
      }}
    >
      {children}
    </DndContext.Provider>
  );
};
