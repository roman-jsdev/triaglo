import {
  FETCH_INITIAL_USER_STATE,
  ADD_BOARD_TO_USER,
  REMOVE_BOARD_FROM_USER,
  SET_INITIAL_USER_STATE,
  SET_USER_STATE_LOADING,
} from "../types";

const handlers = {
  [ADD_BOARD_TO_USER]: (state, { payload }) => ({
    ...state,
    boards: payload,
  }),
  [REMOVE_BOARD_FROM_USER]: (state, { payload }) => ({
    ...state,
    boards: payload,
  }),
  [FETCH_INITIAL_USER_STATE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_INITIAL_USER_STATE]: ({ payload }) => ({
    ...payload,
  }),
  [SET_USER_STATE_LOADING]: (state, { payload }) => ({
    ...state,
    isLoading: payload,
  }),
  DEFAULT: (state) => state,
};

export const userReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
