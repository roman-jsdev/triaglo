import { RemoveColumnButton } from "@components/RemoveColumnButton/RemoveColumnButton";

import { useBoardState } from "@store/BoardContext/BoardContext";

export const RemoveColumnButtonController = () => {
  const { removeColumn: removeColumnFromState } = useBoardState();

  const removeColumn = ({ target }) => {
    const {
      dataset: { rbdDragHandleDraggableId: columnId },
    } = target.closest("[data-rbd-drag-handle-draggable-id]");
    removeColumnFromState(columnId);
  };

  return <RemoveColumnButton removeColumn={removeColumn} />;
};
