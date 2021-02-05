import { Draggable, Droppable } from "react-beautiful-dnd";
import { Container, TaskList } from "./Styled";
import { AddNewTaskBtn } from "../AddNewTaskBtn/AddNewTaskBtn";
import { ColumnTitle } from "../ColumnTitle/ColumnTitle";
import { InnerList } from "./InnerList";

export const Column = ({ column, tasks, index }) => (
  <Draggable draggableId={column.id} index={index}>
    {({ innerRef, draggableProps, dragHandleProps }) => (
      <Container ref={innerRef} {...draggableProps}>
        <ColumnTitle providedProps={dragHandleProps} column={column} />
        <Droppable droppableId={column.id} type="task">
          {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
            <TaskList
              ref={innerRef}
              {...droppableProps}
              isDraggingOver={isDraggingOver}
              isEmpty={!!tasks.length}
            >
              <InnerList tasks={tasks} />
              {placeholder}
            </TaskList>
          )}
        </Droppable>
        <AddNewTaskBtn />
      </Container>
    )}
  </Draggable>
);
