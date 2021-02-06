import styled from "styled-components";

export const Container = styled.div`
  margin: 8px;
  border: 1px solid var(--column-border-color);
  border-radius: var(--main-border-radius);
  width: 300px;
  min-width: 300px;
  display: flex;
  height: max-content;
  flex-direction: column;
  max-height: calc(85vh - 16px);

  @media screen and (max-width: 576px) {
    max-height: calc(82vh - 16px);
    width: 270px;
    min-width: 270px;
  }
`;

export const TaskList = styled.div`
  padding: ${({ isEmpty }) => (!isEmpty ? "2px" : "8px")};
  transition: background-color 0.15s ease;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver
      ? "var(--column-primary-dragged-background)"
      : "var(--column-primary-background)"};
  flex-grow: 1;
  overflow-y: auto;
`;
