import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "../store/AuthContext/AuthContext";
import { storage } from "../utils";

export const useAuth = (authData, type) => {
  const { login } = useAuthState();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const getUrl = (type) => {
    const dynamicUrl = type === "login" ? "signInWithPassword" : "signUp";
    return `https://identitytoolkit.googleapis.com/v1/accounts:${dynamicUrl}?key=${process.env.REACT_APP_API_KEY}`;
  };

  const auth = async () => {
    try {
      setIsLoading(true);
      const {
        data: { expiresIn, idToken, localId, email },
      } = await axios.post(getUrl(type), authData);

      const expirationDate =
        type === "login"
          ? new Date(new Date().getTime() + 3600000)
          : new Date(new Date().getTime() + expiresIn * 1000);

      storage({ token: idToken, userId: localId, email, expirationDate });

      login(idToken, localId, email);

      history.push("/");
    } catch (e) {
      alert("Incorrect Login Data");
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return setIsLoading(false);
  }, []);

  return [auth, isLoading];
};
