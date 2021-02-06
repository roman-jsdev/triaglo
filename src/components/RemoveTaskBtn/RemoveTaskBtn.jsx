import { useBoardState } from "@store/BoardContext/BoardContext";
import { Button } from "@components/RemoveColumnBtn/Styled";

export const RemoveTaskBtn = () => {
  const { removeTask: removeTaskFromState } = useBoardState();

  const removeTask = ({ target }) => {
    const {
      dataset: { rbdDragHandleDraggableId: taskId },
    } = target.closest("[data-rbd-drag-handle-draggable-id]");
    const {
      dataset: { rbdDroppableId: columnId },
    } = target.closest("[data-rbd-droppable-id]");
    removeTaskFromState(taskId, columnId);
  };

  return (
    <Button onClick={removeTask}>
      <i className="far fa-trash-alt" />
    </Button>
  );
};
