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
} from "../types";

const handlers = {
  [SET_COLUMN_ORDER]: (state, { payload }) => ({
    ...state,
    columnOrder: payload,
  }),
  [SET_NEW_SAME_COLUMN]: (state, { payload }) => ({
    ...state,
    columns: payload,
  }),
  [SET_NEW_COLUMN]: (state, { payload }) => ({
    ...state,
    columns: payload,
  }),
  [ADD_NEW_COLUMN]: (state, { payload }) => ({
    ...state,
    columns: payload.columns,
    columnOrder: payload.order,
  }),
  [REMOVE_COLUMN]: (state, { payload }) => ({
    ...state,
    tasks: payload.tasks,
    columns: payload.columns,
    columnOrder: payload.order,
  }),
  [ADD_NEW_TASK]: (state, { payload }) => ({
    ...state,
    tasks: payload.tasks,
    columns: payload.columns,
  }),
  [REMOVE_TASK]: (state, { payload }) => ({
    ...state,
    tasks: payload.tasks,
    columns: payload.columns,
  }),
  [SET_COLUMN_TITLE]: (state, { payload }) => ({
    ...state,
    columns: payload,
  }),
  [SET_TASK_TITLE]: (state, { payload }) => ({
    ...state,
    tasks: payload,
  }),
  [ADD_USER_TO_BOARD]: (state, { payload }) => ({
    ...state,
    invited: payload,
  }),
  [REMOVE_USER_FROM_BOARD]: (state, { payload }) => ({
    ...state,
    invited: payload,
  }),
  [FETCH_INITIAL_STATE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  DEFAULT: (state) => state,
};

export const boardReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
