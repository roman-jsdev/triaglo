import { useCallback, useReducer } from "react";
import { AUTH_LOGOUT, AUTH_SUCCESS } from "../types";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

const initialState = { token: null, id: null, email: null };

export const AuthState = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("expirationDate");
    dispatch({ type: AUTH_LOGOUT });
  }, []);

  const login = useCallback(
    (token, id, email) => {
      const payload = {
        token,
        id,
        email,
      };
      dispatch({ type: AUTH_SUCCESS, payload });
      return setTimeout(() => {
        logout();
      }, 3600000);
    },
    [logout]
  );

  const autoLogin = useCallback(() => {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("userId");
    const email = sessionStorage.getItem("email");
    if (!token) {
      return logout();
    } else {
      const expirationDate = new Date(sessionStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        return logout();
      } else {
        return login(token, id, email);
      }
    }
  }, [login, logout]);

  return (
    <AuthContext.Provider value={{ authState, login, logout, autoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
   