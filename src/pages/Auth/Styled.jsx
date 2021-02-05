import styled from "styled-components";
import { Wrapper } from "../../components/WelcomePage/Styled";

export const AuthPageWrapper = styled(Wrapper)`
  justify-content: center;

  @media screen and (max-width: 576px) {
    height: 90vh;
  }
`;
