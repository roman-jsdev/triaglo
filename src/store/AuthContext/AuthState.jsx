import { useCallback, useReducer } from "react";
import { AUTH_LOGOUT, AUTH_SUCCESS } from "../types";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

const initialState = { token: null };

export const AuthState = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("expirationDate");
    dispatch({ type: AUTH_LOGOUT });
  }, []);

  const login = useCallback(
    (token) => {
      dispatch({ type: AUTH_SUCCESS, payload: token });
      return setTimeout(() => {
        logout();
      }, 3600000);
    },
    [logout]
  );

  const autoLogin = useCallback(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return logout();
    } else {
      const expirationDate = new Date(sessionStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        return logout();
      } else {
        return login(token);
      }
    }
  }, [login, logout]);

  return (
    <AuthContext.Provider value={{ authState, login, logout, autoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
