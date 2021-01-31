import { useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { AddNewTaskBtn } from "./AddNewTaskBtn/AddNewTaskBtn";
import { ColumnTitle } from "./ColumnTitle";
import { Task } from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid var(--column-border-color);
  border-radius: var(--main-border-radius);
  width: 300px;
  min-width: 300px;
  height: max-content;
  display: flex;
  flex-direction: column;
`;

const TaskList = styled.div`
  padding: ${({ isEmpty }) => (!isEmpty ? 0 : "8px")};
  transition: background-color 0.15s ease;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "var(--column-primary-dragged-background)"
      : "var(--column-primary-background)"};
  flex-grow: 1;
  max-height: 75vh;
  overflow-y: auto;
`;

const InnerList = ({ tasks }) => {
  const listComponent = useMemo(
    () =>
      tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      )),
    [tasks]
  );
  return listComponent;
};

export const Column = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <ColumnTitle
            providedProps={provided.dragHandleProps}
            column={column}
          />
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                isEmpty={!!tasks.length}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <AddNewTaskBtn />
        </Container>
      )}
    </Draggable>
  );
};
