import { useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Task } from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid #eee;
  border-radius: 2px;
  width: 300px;
  height: max-content;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
  background-color: #f7f7f7;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.15s ease;
  background-color: ${(props) => (props.isDraggingOver ? "#eee" : "white")};
  flex-grow: 1;
  min-height: 100px;
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
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};
