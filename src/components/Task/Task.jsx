import { TaskTitleController } from "@containers/TaskTitleController";
import { RemoveTaskButtonController } from "@containers/RemoveTaskButtonController";

import { Container } from "./Styled";

import { Draggable } from "react-beautiful-dnd";

export const Task = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
      <Container
        ref={innerRef}
        {...draggableProps}
        {...dragHandleProps}
        isDragging={isDragging}
      >
        <TaskTitleController task={task} isDragging={isDragging} />
        <RemoveTaskButtonController />
      </Container>
    )}
  </Draggable>
);
