import { useBoardState } from "@store/BoardContext/BoardContext";
import { Button } from "./Styled";

export const RemoveColumnBtn = () => {
  const { removeColumn: removeColumnFromState } = useBoardState();

  const removeColumn = ({ target }) => {
    const {
      dataset: { rbdDragHandleDraggableId: columnId },
    } = target.closest("[data-rbd-drag-handle-draggable-id]");
    removeColumnFromState(columnId);
  };

  return (
    <Button onClick={removeColumn}>
      <i className="far fa-trash-alt" />
    </Button>
  );
};
