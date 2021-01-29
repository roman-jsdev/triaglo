import { Draggable } from "react-beautiful-dnd";
import styled, { css } from "styled-components";
import { RemoveTaskBtn } from "./RemoveTaskBtn";
import { TaskTitle } from "./TaskTitle";

const Container = styled.div(
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

export const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <TaskTitle task={task} isDragging={snapshot.isDragging} />
          <RemoveTaskBtn />
        </Container>
      )}
    </Draggable>
  );
};
