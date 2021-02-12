import { useState } from "react";

import { NewTaskButton } from "@components/NewTaskButton/NewTaskButton";

import { useBoardState } from "@store/BoardContext/BoardContext";

export const NewTaskButtonController = () => {
  const [inputValue, setInputValue] = useState("");
  const { addNewTask } = useBoardState();

  const addTask = ({ target }) => {
    if (!inputValue) return;
    const {
      dataset: { rbdDraggableId },
    } = target.closest("[data-rbd-draggable-id]");
    addNewTask(rbdDraggableId, inputValue);
    setInputValue("");
  };

  const addTaskOnEnterPress = (event) => {
    if (event.key !== "Enter" || !inputValue) return;
    addTask(event);
  };

  const changeInputValue = ({ target: { value } }) => setInputValue(value);

  return (
    <NewTaskButton
      addTaskOnEnterPress={addTaskOnEnterPress}
      inputValue={inputValue}
      changeInputValue={changeInputValue}
      addTask={addTask}
    />
  );
};
