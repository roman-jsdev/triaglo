import styled from "styled-components";
import { useDndState } from "../store/DndContext/DndContext";

const Button = styled.div`
  cursor: pointer;
`;

export const RemoveTaskBtn = () => {
  const { removeTask } = useDndState();

  const handleClick = (e) => {
    const taskSelector = "[data-rbd-drag-handle-draggable-id]";
    const id = e.target.closest(taskSelector).dataset.rbdDragHandleDraggableId;

    const columnSelector = "[data-rbd-droppable-id]";
    const columnId = e.target.closest(columnSelector).dataset.rbdDroppableId;

    removeTask(id, columnId);
  };

  return (
    <Button onClick={handleClick}>
      <i className="far fa-trash-alt"></i>
    </Button>
  );
};
