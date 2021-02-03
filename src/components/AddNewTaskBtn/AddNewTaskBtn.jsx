import { useState } from "react";
import { useBoardState } from "../../store/BoardContext/BoardContext";
import { Input, ButtonsWrapper, AddButton } from "../AddNewTaskBtn/Styled";

export const AddNewTaskBtn = () => {
  const [inputValue, setInputValue] = useState("");
  const { addNewTask } = useBoardState();

  const addTask = ({ target }) => {
    if (!inputValue) return;
    const {dataset: {rbdDraggableId}} = target.closest("[data-rbd-draggable-id]");
    addNewTask(rbdDraggableId, inputValue);
    setInputValue("");
  };

  const addTaskOnEnterPress = (event) => {
    if (event.key !== "Enter" || !inputValue) return;
    addTask(event);
  };

  return (
    <ButtonsWrapper onKeyPress={addTaskOnEnterPress}>
      <Input
        value={inputValue}
        onChange={({  target  }) => setInputValue(target.value)}
        placeholder="Enter title of new task..."
      />
      <AddButton onClick={addTask}>Add task</AddButton>
    </ButtonsWrapper>
  );
};
