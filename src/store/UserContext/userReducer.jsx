import {
  FETCH_INITIAL_USER_STATE,
  ADD_BOARD_TO_USER,
  REMOVE_BOARD_FROM_USER,
  SET_INITIAL_USER_STATE,
  SET_USER_STATE_LOADING,
} from "@store/types";

const cases = {
  [ADD_BOARD_TO_USER]: (state, { payload: boards }) => ({
    ...state,
    boards,
  }),
  [REMOVE_BOARD_FROM_USER]: (state, { payload: boards }) => ({
    ...state,
    boards,
  }),
  [FETCH_INITIAL_USER_STATE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_INITIAL_USER_STATE]: ({ payload }) => ({
    ...payload,
  }),
  [SET_USER_STATE_LOADING]: (state, { payload: isLoading }) => ({
    ...state,
    isLoading,
  }),
  DEFAULT: (state) => state,
};

export const userReducer = (state, action) => {
  const reducer = cases[action.type] || cases.DEFAULT;
  return reducer(state, action);
};
