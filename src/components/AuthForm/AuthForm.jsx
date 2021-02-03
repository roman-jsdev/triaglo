import {
  FormWrapper,
  Title,
  SwitchLink,
  Form,
  Label,
  Input,
  Button,
} from "./Styled";

export const AuthForm = ({
  onSubmit,
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
      <Form onSubmit={onSubmit}>
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
