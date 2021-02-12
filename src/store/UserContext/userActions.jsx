import { objectFilter } from "@src/utils";

import {
  ADD_BOARD_TO_USER,
  FETCH_INITIAL_USER_STATE,
  REMOVE_BOARD_FROM_USER,
  SET_INITIAL_USER_STATE,
  SET_USER_STATE_LOADING,
} from "@store/types";

export const addBoardToUserAction = ({ boards }, board) => ({
  type: ADD_BOARD_TO_USER,
  payload: { ...boards, board },
});

export const removeBoardFromUserAction = ({ boards }, boardId) => ({
  type: REMOVE_BOARD_FROM_USER,
  payload: objectFilter(boards, (board) => board !== boardId),
});

export const setInitialUserStateAction = (initialUserState) => ({
  type: SET_INITIAL_USER_STATE,
  payload: initialUserState,
});

export const setUserStateLoadingAction = (type) => ({
  type: SET_USER_STATE_LOADING,
  payload: type,
});

export const fetchInitialUserStateAction = (finalResponse) => ({
  type: FETCH_INITIAL_USER_STATE,
  payload: {
    ...finalResponse,
    isLoading: false,
  },
});
