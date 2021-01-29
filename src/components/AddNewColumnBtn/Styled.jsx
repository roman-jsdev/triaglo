import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 8px;
  color: white;
  font-size: 16px;
  padding: 5px;
  font-weight: 600;
  background-color: hsla(0, 0%, 100%, 0.24);
  border-radius: var(--main-border-radius);
  width: 300px;
  height: max-content;
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    background-color: #f9f9f961;
  }
`;

export const AddLink = styled.p`
  cursor: pointer;
  user-select: none;
`;

export const ButtonsWrapper = styled.div`
  flex-direction: column;
`;

export const Input = styled.input`
  height: 24px;
  border-radius: var(--main-border-radius);
  border: 1px solid #eee;
  padding: 5px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0px 0.3px #0c4891;
  }
`;

export const Buttons = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const AddButton = styled.div`
  padding: 5px;
  margin-right: 15px;
  border-radius: var(--main-border-radius);
  background-color: var(--add-button-background);
  transition: all 0.3s;
  font-size: 14px;
  font-weight: 400;
  &:hover {
    background-color: var(--add-button-hover-background);
  }
  cursor: pointer;
  user-select: none;
`;

export const CloseButton = styled.div`
  color: #0c4891;
  cursor: pointer;
  user-select: none;
`;
