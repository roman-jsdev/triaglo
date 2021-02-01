import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 25px;
`;

const SwitchLink = styled.div`
  cursor: pointer;
  user-select: none;
  text-align: center;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 5px;
  height: 30px;
  border: 1px solid var(--column-border-color);

  &:focus,
  :active {
    outline: none;
  }
`;

const Button = styled.button`
  margin-top: 15px;
  width: 33%;
  padding: 10px;
  border-radius: var(--main-border-radius);
  border: none;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  color: white;
  background-color: var(--add-button-background);

  &:focus,
  :active {
    outline: none;
  }

  &:hover {
    background-color: var(--add-button-hover-background);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;

    &:hover {
      background-color: var(--add-button-background);
    }
  }
`;

export const AuthForm = ({
  handleSubmit,
  isLogin,
  setIsLogin,
  email,
  setEmail,
  password,
  setPassword,
  type,
  isLoading,
}) => {
  return (
    <FormWrapper>
      <Title>{isLogin ? "Login" : "Sign Up For Free"}</Title>
      <SwitchLink
        onClick={() => {
          setIsLogin(!isLogin);
          setEmail("");
          setPassword("");
        }}
      >
        {isLogin
          ? "Don't have an account yet?  Sign Up"
          : "Already have an account?  Sign In"}
      </SwitchLink>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="emailInput">Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email..."
          id="emailInput"
        />
        <Label htmlFor="passwordInput">Password</Label>
        <Input
          type="password"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password..."
          id="passwordInput"
        />
        <Button type="submit" disabled={isLoading}>
          {type === "login" ? "Login" : "Register"}
        </Button>
      </Form>
    </FormWrapper>
  );
};
