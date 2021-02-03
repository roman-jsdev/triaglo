import { useState } from "react";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { useAuth } from "../hooks/useAuth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const authData = {
    email,
    password,
  };

  const type = isLogin ? "login" : "register";

  const [auth, isLoading] = useAuth(authData, type);

  const submitForm = (e) => {
    e.preventDefault();
    if (!authData.password && !authData.email) return;
    auth();
  };

  return (
    <AuthForm
      onSubmit={submitForm}
      type={type}
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      isLoading={isLoading}
    />
  );
};
