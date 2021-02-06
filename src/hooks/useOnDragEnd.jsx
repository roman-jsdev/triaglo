import { useBoardState } from "@store/BoardContext/BoardContext";

export const useOnDragEnd = () => {
  const {
    boardState: { columns },
    setColumnOrder,
    setNewSameColumn,
    setNewColumn,
  } = useBoardState();

  const onDragEnd = ({ destination, source, draggableId, type }) => {
    if (!destination) return;

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

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      setNewSameColumn(start, source, destination, draggableId);
      return;
    }

    setNewColumn(start, finish, source, destination, draggableId);
  };

  return [onDragEnd];
};
