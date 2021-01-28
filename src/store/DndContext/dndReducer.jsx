import {
  SET_COLUMN_ORDER,
  SET_NEW_SAME_COLUMN,
  SET_NEW_COLUMN,
  ADD_NEW_COLUMN,
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
  DEFAULT: (state) => state,
};

export const dndReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
