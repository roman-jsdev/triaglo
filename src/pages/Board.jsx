import { useEffect, useMemo } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { AddNewColumn } from "../components/AddNewColumnBtn/AddNewColumnBtn";
import { BoardHeader } from "../components/BoardHeader/BoardHeader";
import { Column } from "../components/Column";
import { Loader } from "../components/Loader";
import { useAuthState } from "../store/AuthContext/AuthContext";
import { useDndState } from "../store/DndContext/DndContext";

const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  height: 90vh;
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
    fetchInitialState,
  } = useDndState();

  const { authState } = useAuthState();

  const isLoggedIn = sessionStorage.getItem("token");

  const getAccess = (type) => {
    document.body.style.backgroundColor = dndState.bg;

    const invitedList = dndState.invited;

    const ownerId = dndState.owner;
    const userId = authState.id;
    const userEmail = authState.email;

    return type === "owner"
      ? (ownerId === userId) && isLoggedIn
      : invitedList.includes(userEmail)  && isLoggedIn
  };

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
      setColumnOrder(source, destination, draggableId);
      return;
    }

    const start = dndState.columns[source.droppableId];
    const finish = dndState.columns[destination.droppableId];

    if (start === finish) {
      setNewSameColumn(start, source, destination, draggableId);
      return;
    }

    setNewColumn(start, finish, source, destination, draggableId);
  };

  useEffect(() => {
    if(dndState.isLoading) {
      fetchInitialState()
    }  
  },[fetchInitialState, dndState.isLoading])

  return (
    <>
      {dndState.isLoading ? (
        <Loader />
      ) : (
        <>
          {getAccess("owner") || getAccess("invited") ? (
            <>
              <BoardHeader />
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  droppableId="all-columns"
                  direction="horizontal"
                  type="column"
                >
                  {(provided) => (
                    <Container
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
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
          ) : (
            <h1 style={{ color: "white", textAlign: "center" }}>
              No Access To This Board
            </h1>
          )}
        </>
      )}
    </>
  );
};
