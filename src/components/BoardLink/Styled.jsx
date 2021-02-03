import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & a {
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 2% 2% 0;
    background-color: #3030d8;
    padding: 5px;
    color: white;
    text-align: center;
    transition: all 0.3s;
    height: 150px;

    &:hover {
      text-decoration: none;
      background-color: #2a2ab6;
    }

    &:focus {
      outline: none;
    }
  }
`;

export const DeleteBtn = styled.div`
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
