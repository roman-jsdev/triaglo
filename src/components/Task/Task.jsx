import { RemoveTaskBtn } from "@components/RemoveTaskBtn/RemoveTaskBtn";
import { TaskTitle } from "@components/TaskTitle/TaskTitle";
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
        <TaskTitle task={task} isDragging={isDragging} />
        <RemoveTaskBtn />
      </Container>
    )}
  </Draggable>
);
