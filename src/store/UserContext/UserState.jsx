import { useEffect, useReducer } from "react";
import { ADD_BOARD_TO_USER, REMOVE_BOARD_FROM_USER } from "../types";
import { UserContext } from "./UserContext";
import { userReducer } from "./userReducer";

const initialState = {
  userId: sessionStorage.getItem("userId"),
  userEmail: sessionStorage.getItem("email"),
  boards: [],
};

export const UserState = ({ children }) => {
  const getInitialState = () => {
    if (localStorage.getItem(sessionStorage.getItem("userId"))) {
      const initialDbState = JSON.parse(
        localStorage.getItem(sessionStorage.getItem("userId"))
      );
      return initialDbState;
    } else {
      return initialState;
    }
  };
  const [userState, dispatch] = useReducer(userReducer, getInitialState());

  useEffect(() => {
    if (userState.userId) {
      localStorage.setItem(userState.userId, JSON.stringify(userState));
    }
  }, [userState]);

  const addBoardToUser = (id) => {
    const currentBoards = [...userState.boards];
    const payload = [...currentBoards, id];
    dispatch({ type: ADD_BOARD_TO_USER, payload });
  };

  const removeBoardFromUser = (id) => {
    const currentBoards = [...userState.boards];
    const payload = currentBoards.filter((e) => e !== id);
    dispatch({ type: REMOVE_BOARD_FROM_USER, payload });
  };

  return (
    <UserContext.Provider
      value={{ userState, addBoardToUser, removeBoardFromUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
