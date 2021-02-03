import styled from "styled-components";

export const Container = styled.div`
  margin: 8px;
  border: 1px solid var(--column-border-color);
  border-radius: var(--main-border-radius);
  width: 300px;
  min-width: 300px;
  height: max-content;
  display: flex;
  flex-direction: column;
`;

export const TaskList = styled.div`
  padding: ${({ isEmpty }) => (!isEmpty ? 0 : "8px")};
  transition: background-color 0.15s ease;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver
      ? "var(--column-primary-dragged-background)"
      : "var(--column-primary-background)"};
  flex-grow: 1;
  max-height: 75vh;
  overflow-y: auto;
`;
