import { useState } from "react";
import { useDndState } from "../../store/DndContext/DndContext";
import { Input, ButtonsWrapper, AddButton } from "../AddNewTaskBtn/Styled";

export const AddNewTaskBtn = () => {
  const [value, setValue] = useState("");
  const { addNewTask } = useDndState();

  const onAdd = (e) => {
    if (!value) return;
    const selector = "[data-rbd-draggable-id]";
    const columnId = e.target.closest(selector).dataset.rbdDraggableId;
    addNewTask(columnId, value);
    setValue("");
  };

  const onEnterPress = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    if (value) {
      onAdd(event);
    } else {
      return;
    }
  };

  return (
    <ButtonsWrapper onKeyPress={onEnterPress}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter title of new task..."
      />
      <AddButton onClick={onAdd}>Add task</AddButton>
    </ButtonsWrapper>
  );
};
