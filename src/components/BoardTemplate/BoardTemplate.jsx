import { NewColumnButtonController } from "@containers/NewColumnButtonController";
import { BoardHeaderController } from "@containers/BoardHeaderController";
import { ColumnsList } from "./ColumnsList";
import { Loader } from "@components/Loader/Loader";

import { Container, NoAccess } from "./Styled";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

export const BoardTemplate = ({
  isLoading,
  couldAccess,
  onDragEnd,
  columnOrder,
  columns,
  tasks,
}) => (
  <>
    {isLoading ? (
      <Loader />
    ) : (
      <>
        {couldAccess ? (
          <>
            <BoardHeaderController />
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
                    <NewColumnButtonController />
                  </Container>
                )}
              </Droppable>
            </DragDropContext>
          </>
        ) : (
          <NoAccess style={{ color: "var(--main-bark-color)" }}>
            No Access To This Board
          </NoAccess>
        )}
      </>
    )}
  </>
);
