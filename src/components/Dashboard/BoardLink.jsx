import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
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

const DeleteBtn = styled.div`
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

export const BoardLink = ({ to, type, title }) => {
  const [show, setShow] = useState(true);

  const handleDelete = () => {
    localStorage.removeItem(title);
    setShow(false);
  };

  return (
    <>
      {show ? (
        <Wrapper>
          <Link to={type === "new" ? `/board/${Date.now()}` : to}>
            <span>{title}</span>
          </Link>
          {type === "new" ? null : (
            <DeleteBtn onClick={handleDelete}>
              <i className="fas fa-trash-alt"></i>
            </DeleteBtn>
          )}
        </Wrapper>
      ) : null}
    </>
  );
};
