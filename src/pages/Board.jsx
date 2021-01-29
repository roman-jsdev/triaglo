import { useMemo } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { AddNewColumn } from "../components/AddNewColumnBtn/AddNewColumnBtn";
import { Column } from "../components/Column";
import { useDndState } from "../store/DndContext/DndContext";

const Container = styled.div`
  display: flex;
  width: max-content;
`;

const InnerList = ({ column, taskMap, index }) => {
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  const listComponent = useMemo(
    () => <Column column={column} tasks={tasks} index={index} />,
    [column, tasks, index]
  );
  return listComponent;
};

export const Board = () => {
  const {
    dndState,
    setColumnOrder,
    setNewSameColumn,
    setNewColumn,
  } = useDndState();

  document.body.style.backgroundColor = dndState.bg;

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(dndState.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setColumnOrder(newColumnOrder);
      return;
    }

    const start = dndState.columns[source.droppableId];
    const finish = dndState.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setNewSameColumn(newColumn);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setNewColumn(newStart, newFinish);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {dndState.columnOrder.map((columnId, index) => {
                const column = dndState.columns[columnId];
                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    taskMap={dndState.tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
              <AddNewColumn />
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
