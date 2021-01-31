import { ADD_BOARD_TO_USER, REMOVE_BOARD_FROM_USER } from "../types";

const handlers = {
  [ADD_BOARD_TO_USER]: (state, { payload }) => ({
    ...state,
    boards: payload,
  }),
  [REMOVE_BOARD_FROM_USER]: (state, { payload }) => ({
    ...state,
    boards: payload,
  }),
  DEFAULT: (state) => state,
};

export const userReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
