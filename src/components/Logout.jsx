import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuthState } from "../store/AuthContext/AuthContext";

export const Logout = () => {
  const { logout } = useAuthState();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Redirect to="/" />;
};
