import { Draggable } from "react-beautiful-dnd";
import styled, { css } from "styled-components";

const Container = styled.div(
  ({ isDragging }) => css`
    border: 1px solid lightgray;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${isDragging ? "#f7f7f7" : "white"};
    user-select: none;
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
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};
