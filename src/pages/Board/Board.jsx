import { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Container, NoAccess } from "./Styled";
import { AddNewColumn } from "../../components/AddNewColumnBtn/AddNewColumnBtn";
import { BoardHeader } from "../../components/BoardHeader/BoardHeader";
import { ColumnsList } from "./ColumnsList";
import { Loader } from "../../components/Loader/Loader";
import { useAccessBoard } from "../../hooks/useAccessBoard";
import { useOnDragEnd } from "../../hooks/useOnDragEnd";
import { useBoardState } from "../../store/BoardContext/BoardContext";

export const Board = () => {
  const {
    boardState: { isLoading, columnOrder, columns, tasks },
    fetchInitialState,
  } = useBoardState();

  const [couldAccess] = useAccessBoard();
  const [onDragEnd] = useOnDragEnd();

  useEffect(() => {
    if (isLoading) {
      fetchInitialState();
    }
    document.body.style.backgroundColor = "var(--main-light-background)";
    return () => (document.body.style.backgroundColor = "inherit");
  }, [fetchInitialState, isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {couldAccess ? (
            <>
              <BoardHeader />
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  droppableId="all-columns"
                  direction="horizontal"
                  type="column"
                >
                  {({ innerRef, droppableProps, placeholder }) => (
                    <Container ref={innerRef} {...droppableProps}>
                      {columnOrder.map((columnId, index) => {
                        const column = columns[columnId];
                        return (
                          <ColumnsList
                            key={column.id}
                            column={column}
                            taskMap={tasks}
                            index={index}
                          />
                        );
                      })}
                      {placeholder}
                      <AddNewColumn />
                    </Container>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          ) : (
            <NoAccess
              style={{ color: "var(--main-bark-color)" }}
              onLoad={(document.body.style.backgroundColor = "inherit")}
            >
              No Access To This Board
            </NoAccess>
          )}
        </>
      )}
    </>
  );
};
