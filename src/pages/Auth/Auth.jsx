import { useState } from "react";

import { AuthForm } from "@components/AuthForm/AuthForm";

import { useAuth } from "@hooks/useAuth";

import { AuthPageWrapper } from "./Styled";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const type = isLogin ? "login" : "register";
  const [auth, isLoading] = useAuth({ email, password }, type);

  const submitForm = (e) => {
    e.preventDefault();
    if (!password && !email) return;
    auth();
  };

  const switchLink = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
  };

  const changeEmail = ({ target: { value } }) => setEmail(value);
  const changePassword = ({ target: { value } }) => setPassword(value);

  return (
    <AuthPageWrapper>
      <AuthForm
        onSubmit={submitForm}
        type={type}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        email={email}
        password={password}
        isLoading={isLoading}
        switchLink={switchLink}
        changeEmail={changeEmail}
        changePassword={changePassword}
      />
    </AuthPageWrapper>
  );
};
