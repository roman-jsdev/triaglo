import { Wrapper } from "@components/WelcomePage/Styled";

import styled from "styled-components";

export const AuthPageWrapper = styled(Wrapper)`
  justify-content: center;

  @media screen and (max-width: 576px) {
    height: 90vh;
  }
`;
