import { RemoveTaskButton } from "@components/RemoveTaskButton/RemoveTaskButton";

import { useBoardState } from "@store/BoardContext/BoardContext";

export const RemoveTaskButtonController = () => {
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

  return <RemoveTaskButton removeTask={removeTask} />;
};
