import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 5vh;

  @media (min-width: 1024px) {
    max-width: 1200px;
    padding: 0 1rem;
  }
`;

export const BoardsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const SideBar = styled.div`
  margin-top: 18px;
  margin-right: 18px;
  width: 25%;
  position: sticky;
  top: 15px;

  @media screen and (max-width: 768px) {
    display: none;
  }

  & p {
    font-size: 18px;
    font-weight: 500;
    color: var(--main-dark-color);
    padding: 5px;
    border-radius: var(--main-border-radius);
    cursor: pointer;

    &.active {
      background-color: #dcedff;
      color: var(--main-light-background);
    }

    & i {
      margin-right: 15px;
      font-weight: 400;
      pointer-events: none;
    }
  }
`;

export const Subtitle = styled.h3`
  font-size: 18px;
  padding: 5px;
  margin-bottom: 10px;

  & i {
    margin-right: 15px;
    font-weight: 400;
  }
`;

export const BoardsSections = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 18px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
