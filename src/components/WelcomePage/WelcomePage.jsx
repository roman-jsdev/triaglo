import { Description, StartButton, Title, Wrapper } from "./Styled";
import { Link } from "react-router-dom";

export const WelcomePage = () => (
  <Wrapper>
    <Title>Tool for team projects and personal tasks</Title>
    <Description>
      Triaglo is the easy, free, flexible, and visual way to manage your
      projects and organize anything, with unlimited speed and cloud storage.
    </Description>
    <StartButton>
      <Link to="/auth">Start now</Link>
    </StartButton>
  </Wrapper>
);
