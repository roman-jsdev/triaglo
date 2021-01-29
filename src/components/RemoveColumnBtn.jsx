import styled from "styled-components";
import { useDndState } from "../store/DndContext/DndContext";

const Button = styled.div`
  cursor: pointer;
`;

export const RemoveColumnBtn = () => {
  const { removeColumn } = useDndState();

  const handleClick = (e) => {
    const selector = "[data-rbd-drag-handle-draggable-id]";
    const id = e.target.closest(selector).dataset.rbdDragHandleDraggableId;

    removeColumn(id);
  };

  return (
    <Button onClick={handleClick}>
      <i className="far fa-trash-alt"></i>
    </Button>
  );
};
