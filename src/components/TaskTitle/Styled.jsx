import styled, { css } from "styled-components";

export const Input = styled.textarea(
  ({ isDragging }) => css`
    background-color: ${isDragging
      ? "var(--task-dragged-background)"
      : "var(--task-background)"};
    resize: none;
    border: none;
    overflow: hidden;
    height: max-content;
    height: 22px;
    width: 215px;
    font-family: inherit;
    &:focus {
      cursor: text;
      background-color: var(--task-background);
    }
  `
);

export const Wrapper = styled.div`
  height: 22px;
`;
