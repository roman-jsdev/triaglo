import { useCallback, useReducer } from "react";
import { useDB } from "../../hooks/useDB";
import { storage } from "../../utils";
import {
  addBoardToUserAction,
  fetchInitialUserStateAction,
  removeBoardFromUserAction,
  setInitialUserStateAction,
  setUserStateLoadingAction,
} from "./userActions";
import { UserContext } from "./UserContext";
import { userReducer } from "./userReducer";

export const UserState = ({ children }) => {
  const { userId, email } = storage() || { userId: null, email: null };
  const initialUserState = {
    userId,
    email,
    isLoading: true,
    boards: {},
  };

  const [userState, dispatch] = useReducer(userReducer, initialUserState);

  const [initDB] = useDB("put", "asyncPath");

  const addBoardToUser = (board) =>
    dispatch(addBoardToUserAction(userState, board));

  const removeBoardFromUser = (boardId) =>
    dispatch(removeBoardFromUserAction(userState, boardId));

  const setInitialUserState = useCallback(
    () => dispatch(setInitialUserStateAction(initialUserState)),
    []
  );

  const setUserStateLoading = (type) =>
    dispatch(setUserStateLoadingAction(type));

  const initUserState = useCallback(
    (response) => {
      const { userId: lazyUserId, email: lazyUserEmail } = storage();
      if (!response.userId) {
        initDB(
          {
            boards: response.boards,
            userId: lazyUserId,
            email: lazyUserEmail,
            isLoading: false,
          },
          `users/${lazyUserId}`
        );
      }
      const finalResponse = response.email ? response : {};
      dispatch(fetchInitialUserStateAction(finalResponse));
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
