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
  REMOVE_USER_FROM_BOARD,
  FETCH_INITIAL_STATE,
  SET_NEW_BOARD_TITLE,
  SET_BOARD_BG,
} from "@store/types";

const cases = {
  [FETCH_INITIAL_STATE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_COLUMN_ORDER]: (state, { payload: columnOrder }) => ({
    ...state,
    columnOrder,
  }),
  [SET_NEW_SAME_COLUMN]: (state, { payload: columns }) => ({
    ...state,
    columns,
  }),
  [SET_NEW_COLUMN]: (state, { payload: columns }) => ({
    ...state,
    columns,
  }),
  [ADD_NEW_COLUMN]: (state, { payload: { columns, order: columnOrder } }) => ({
    ...state,
    columns,
    columnOrder,
  }),
  [REMOVE_COLUMN]: (
    state,
    { payload: { tasks, columns, order: columnOrder } }
  ) => ({
    ...state,
    tasks,
    columns,
    columnOrder,
  }),
  [ADD_NEW_TASK]: (state, { payload: { tasks, columns } }) => ({
    ...state,
    tasks,
    columns,
  }),
  [REMOVE_TASK]: (state, { payload: { tasks, columns } }) => ({
    ...state,
    tasks,
    columns,
  }),
  [SET_COLUMN_TITLE]: (state, { payload: columns }) => ({
    ...state,
    columns,
  }),
  [SET_TASK_TITLE]: (state, { payload: tasks }) => ({
    ...state,
    tasks,
  }),
  [ADD_USER_TO_BOARD]: (state, { payload: invited }) => ({
    ...state,
    invited,
  }),
  [REMOVE_USER_FROM_BOARD]: (state, { payload: invited }) => ({
    ...state,
    invited,
  }),
  [SET_NEW_BOARD_TITLE]: (state, { payload: title }) => ({
    ...state,
    title,
  }),
  [SET_BOARD_BG]: (state, { payload: bg }) => ({
    ...state,
    bg,
  }),
  DEFAULT: (state) => state,
};

export const boardReducer = (state, action) => {
  const reducer = cases[action.type] || cases.DEFAULT;
  return reducer(state, action);
};
