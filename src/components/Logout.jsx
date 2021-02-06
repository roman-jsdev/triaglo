import { useEffect } from "react";
import { useAuthState } from "@store/AuthContext/AuthContext";
import { Redirect } from "react-router-dom";

export const Logout = () => {
  const { logout } = useAuthState();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Redirect to="/" />;
};
