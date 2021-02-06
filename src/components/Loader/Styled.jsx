import styled from "styled-components";

export const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--main-light-background);
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 28px;
    font-weight: 300;
    color: #ffffff;
  }
`;
