import styled from "styled-components";

export const Title = styled.div`
  padding: 8px;
  background-color: var(--column-secondary-background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  border-bottom: 1px solid var(--column-border-color);
`;

export const Input = styled.textarea`
  background-color: var(--column-secondary-background);
  border: none;
  width: 250px;
  font-family: inherit;
  font-size: 16px;
  font-weight: bold;
  cursor: grab;
  overflow-y: hidden;
  resize: none;
  height: 25px;
  &:focus {
    cursor: text;
    background-color: var(--task-background);
  }
`;
