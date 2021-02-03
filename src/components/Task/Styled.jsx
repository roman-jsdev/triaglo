import styled, { css } from "styled-components";

export const Container = styled.div(
  ({ isDragging }) => css`
    border: 1px solid lightgray;
    border-radius: var(--main-border-radius);
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${isDragging
      ? "var(--task-dragged-background)"
      : "var(--task-background)"};
    user-select: none;
    word-wrap: break-word;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
);
