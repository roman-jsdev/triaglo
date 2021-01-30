import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  background-color: var(--column-secondary-background);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  height: 48px;
  border-top: 1px solid var(--column-border-color);
`;
export const Input = styled.input`
  height: 24px;
  border-radius: var(--main-border-radius);
  border: 1px solid var(--column-border-color);
  padding: 5px;
  transition: all 0.15s;
  &:focus {
    outline: none;
    box-shadow: 0 0 0px 0.3px #0c4891;
  }
`;
export const AddButton = styled.p`
  margin: 0;
  padding: 0;
  background-color: var(--add-button-background);
  transition: all 0.3s;
  cursor: pointer;
  user-select: none;
  color: white;
  padding: 6px;
  border-radius: var(--main-border-radius);
  &:hover {
    background-color: var(--add-button-hover-background);
  }
`;
