import { useState } from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useAuth } from "../../hooks/useAuth";
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

  return (
    <AuthPageWrapper>
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
    </AuthPageWrapper>
  );
};
