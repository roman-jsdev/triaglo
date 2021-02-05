import { objectFilter } from "../../utils";
import {
  ADD_NEW_COLUMN,
  ADD_NEW_TASK,
  ADD_USER_TO_BOARD,
  FETCH_INITIAL_STATE,
  REMOVE_COLUMN,
  REMOVE_TASK,
  REMOVE_USER_FROM_BOARD,
  SET_COLUMN_ORDER,
  SET_COLUMN_TITLE,
  SET_NEW_BOARD_TITLE,
  SET_NEW_COLUMN,
  SET_NEW_SAME_COLUMN,
  SET_TASK_TITLE,
} from "../types";

export const fetchInitialStateAction = (response) => ({
  type: FETCH_INITIAL_STATE,
  payload: { ...response, isLoading: false },
});

export const setColumnOrderAction = (
  { columnOrder },
  { index: startIndex },
  { index: finalIndex },
  draggableId
) => {
  const newColumnOrder = [...columnOrder];
  newColumnOrder.splice(startIndex, 1);
  newColumnOrder.splice(finalIndex, 0, draggableId);
  return { type: SET_COLUMN_ORDER, payload: newColumnOrder };
};

export const setNewSameColumnAction = (
  { columns },
  start,
  { index: startIndex },
  { index: finishIndex },
  draggableId
) => {
  const newTaskIds = [...start.taskIds];
  newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(finishIndex, 0, draggableId);

  const newColumn = {
    ...start,
    taskIds: newTaskIds,
  };

  const payload = {
    ...columns,
    [newColumn.id]: newColumn,
  };
  return { type: SET_NEW_SAME_COLUMN, payload };
};

export const setNewColumnAction = (
  { columns },
  start,
  finish,
  { index: startIndex },
  { index: finishIndex },
  draggableId
) => {
  const startTaskIds = [...start.taskIds];
  startTaskIds.splice(startIndex, 1);
  const newStart = {
    ...start,
    taskIds: startTaskIds,
  };

  const finishTaskIds = [...finish.taskIds];
  finishTaskIds.splice(finishIndex, 0, draggableId);
  const newFinish = {
    ...finish,
    taskIds: finishTaskIds,
  };
  const payload = {
    ...columns,
    [newStart.id]: newStart,
    [newFinish.id]: newFinish,
  };
  return { type: SET_NEW_COLUMN, payload };
};

export const addNewColumnAction = ({ columnOrder, columns }, title) => {
  const id = Date.now();
  const newColumn = {
    [`column-${id}`]: {
      id: `column-${id}`,
      title,
      taskIds: [],
    },
  };
  const newOrder = [...columnOrder, `column-${id}`];
  const payload = {
    columns: {
      ...columns,
      ...newColumn,
    },
    order: newOrder,
  };
  return { type: ADD_NEW_COLUMN, payload };
};

export const removeColumnAction = (
  { columns, columnOrder, tasks },
  columnId
) => {
  const currentColumns = { ...columns };
  const currentOrder = [...columnOrder];

  const filteredColumns = objectFilter(
    currentColumns,
    (column) => column !== columnId
  );
  const filteredOrder = [
    ...currentOrder.filter((column) => column !== columnId),
  ];

  const currentTasks = { ...tasks };
  const deletingTasks = [...currentColumns[columnId].taskIds];
  const filteredTasks = objectFilter(
    currentTasks,
    (task) => !deletingTasks.includes(task)
  );

  const payload = {
    tasks: filteredTasks,
    columns: filteredColumns,
    order: filteredOrder,
  };

  return { type: REMOVE_COLUMN, payload };
};

export const addNewTaskAction = ({ columns, tasks }, columnId, content) => {
  const id = Date.now();
  const newTask = {
    [`task-${id}`]: {
      id: `task-${id}`,
      content,
    },
  };

  const currentColumns = { ...columns };
  currentColumns[columnId].taskIds = [
    ...currentColumns[columnId].taskIds,
    `task-${id}`,
  ];

  const payload = {
    tasks: {
      ...tasks,
      ...newTask,
    },
    columns: currentColumns,
  };
  return { type: ADD_NEW_TASK, payload };
};

export const removeTaskAction = ({ tasks, columns }, taskId, columnId) => {
  const currentTasks = { ...tasks };
  const currentColumns = { ...columns };

  const filteredTasks = objectFilter(currentTasks, (task) => task !== taskId);

  const { taskIds } = currentColumns[columnId];
  const taskIndex = taskIds.indexOf(taskId);
  taskIds.splice(taskIndex, 1);

  const payload = {
    tasks: {
      ...filteredTasks,
    },
    columns: currentColumns,
  };

  return { type: REMOVE_TASK, payload };
};

export const setColumnTitleAction = ({ columns }, columnId, title) => {
  const currentColumns = { ...columns };
  currentColumns[columnId].title = title;
  return { type: SET_COLUMN_TITLE, payload: currentColumns };
};

export const setTaskTitleAction = ({ tasks }, taskId, title) => {
  const currentTasks = { ...tasks };
  currentTasks[taskId].content = title;
  return { type: SET_TASK_TITLE, payload: currentTasks };
};

export const addUserToBoardAction = ({ invited }, email) => ({
  type: ADD_USER_TO_BOARD,
  payload: [...invited, email],
});

export const removeUserFromBoardAction = ({ invited }, email) => ({
  type: REMOVE_USER_FROM_BOARD,
  payload: [...invited].filter((user) => user !== email),
});

export const setNewBoardTitleAction = (title) => ({
  type: SET_NEW_BOARD_TITLE,
  payload: title,
});
