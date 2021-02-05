import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  pointer-events: none;

  @media screen and (max-width: 576px) {
    width: 100%;
  }

  & a,
  p {
    pointer-events: all;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5% 5% 0;
    background-color: var(--main-light-background);
    padding: 5px;
    color: white;
    text-align: center;
    transition: all 0.3s;
    height: 110px;
    border-radius: var(--main-border-radius);

    @media screen and (max-width: 768px) {
      width: 250px;
    }

    @media screen and (max-width: 576px) {
      width: 100%;
      margin-right: 0;
    }

    &:hover {
      text-decoration: none;
      background-color: var(--main-light-background-hover);
    }

    &:focus {
      outline: none;
    }
  }
`;

export const DeleteBtn = styled.div`
  pointer-events: all;
  position: absolute;
  width: 25px;
  height: 25px;
  color: white;
  font-size: 18px;
  right: 5px;
  top: 5px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;

  &:hover {
    color: #d6d6d6;
  }
`;
