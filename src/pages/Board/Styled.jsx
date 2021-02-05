import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  height: 87vh;

  @media screen and (max-width: 576px) {
    height: 82vh;
  }
`;

export const NoAccess = styled.div`
  color: white;
  text-align: center;
  font-size: 48px;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
