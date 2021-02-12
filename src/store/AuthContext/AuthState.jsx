import { useCallback, useReducer } from "react";

import { storage } from "@src/utils";

import { AUTH_LOGOUT, AUTH_SUCCESS } from "@store/types";
import { useUserState } from "@store/UserContext/UserContext";

import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

export const AuthState = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    token: null,
    id: null,
    email: null,
  });
  const { setInitialUserState } = useUserState();

  const logout = useCallback(() => {
    dispatch({ type: AUTH_LOGOUT });
    setInitialUserState();
    localStorage.clear();
  }, [setInitialUserState]);

  const login = useCallback(
    (token, id, email) => {
      dispatch({ type: AUTH_SUCCESS, payload: { token, id, email } });
      return setTimeout(logout, 3600000);
    },
    [logout]
  );

  const autoLogin = useCallback(() => {
    if (!storage()) return logout();
    const { token, userId, email, expirationDate } = storage();
    return new Date(expirationDate) <= new Date()
      ? logout()
      : login(token, userId, email);
  }, [login, logout]);

  return (
    <AuthContext.Provider value={{ authState, login, logout, autoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
