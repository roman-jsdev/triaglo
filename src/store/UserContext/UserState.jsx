import { useCallback, useReducer } from "react";
import { useDB } from "../../hooks/useDB";
import { initialUserState } from "../../initialData";
import {
  ADD_BOARD_TO_USER,
  FETCH_INITIAL_USER_STATE,
  REMOVE_BOARD_FROM_USER,
  SET_INITIAL_USER_STATE,
  SET_USER_STATE_LOADING,
} from "../types";
import { UserContext } from "./UserContext";
import { userReducer } from "./userReducer";

export const UserState = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);

  const [initDB] = useDB("put", "asyncPath");

  const addBoardToUser = (board) => {
    const payload = { ...userState.boards, ...board };
    dispatch({ type: ADD_BOARD_TO_USER, payload });
  };

  const removeBoardFromUser = (id) => {
    const payload = Object.keys(userState.boards)
      .filter((key) => key !== id)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: userState.boards[key],
        };
      }, {});
    dispatch({ type: REMOVE_BOARD_FROM_USER, payload });
  };

  const setInitialUserState = useCallback(() => {
    dispatch({ type: SET_INITIAL_USER_STATE, payload: initialUserState });
  }, []);

  const setUserStateLoading = (type) => {
    dispatch({ type: SET_USER_STATE_LOADING, payload: type });
  };

  const initUserState = useCallback(
    (response) => {
      if (!response.userId) {
        initDB(
          {
            boards: response.boards,
            userId: sessionStorage.getItem("userId"),
            email: sessionStorage.getItem("email"),
            isLoading: false,
          },
          `users/${sessionStorage.getItem("userId")}`
        );
      }
      const finalResponse = response.email ? response : {};
      dispatch({
        type: FETCH_INITIAL_USER_STATE,
        payload: {
          ...finalResponse,
          isLoading: false,
        },
      });
    },
    [initDB]
  );

  return (
    <UserContext.Provider
      value={{
        userState,
        initUserState,
        addBoardToUser,
        removeBoardFromUser,
        setInitialUserState,
        setUserStateLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
