import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuthState } from "../store/AuthContext/AuthContext";

export const useAuth = (authData, type) => {
  const { login } = useAuthState();
  const history = useHistory();

  const url =
    type === "login"
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;

  const tryLogin = async () => {
    try {
      const response = await axios.post(url, authData);

      const data = response.data;
      const expirationDate =
        type === "login"
          ? new Date(new Date().getTime() + 3600000)
          : new Date(new Date().getTime() + data.expiresIn * 1000);

      sessionStorage.setItem("token", data.idToken);
      sessionStorage.setItem("userId", data.localId);
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("expirationDate", expirationDate);

      login(data.idToken, data.localId, data.email);
      history.push("/");
    } catch (e) {
      alert("Incorrect Login Data");
      console.log(e);
    }
  };

  return [tryLogin];
};
