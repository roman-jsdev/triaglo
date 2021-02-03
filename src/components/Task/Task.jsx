import { Draggable } from "react-beautiful-dnd";
import { RemoveTaskBtn } from "../RemoveTaskBtn/RemoveTaskBtn";
import { TaskTitle } from "../TaskTitle/TaskTitle";
import { Container } from "./Styled";

export const Task = ({ task, index }) => {
  return (
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
};
