import { useCallback, useEffect, useRef, useState } from "react";

import { TaskTitle } from "@components/TaskTitle/TaskTitle";

import { useBoardState } from "@store/BoardContext/BoardContext";

export const TaskTitleController = ({
  task: { id: taskId, content },
  isDragging,
}) => {
  const [taskContent, setTaskContent] = useState(content);
  const { setTaskTitle } = useBoardState();
  const titleRef = useRef();
  const wrapperRef = useRef();

  const changeTask = ({ target: { value } }) => {
    setTaskContent(value);
    wrapperRef.current.style.height = "26px";
    titleRef.current.style.height = "18px";
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    wrapperRef.current.style.height = titleRef.current.scrollHeight + "px";
  };

  const setTaskToState = () => setTaskTitle(taskId, taskContent);

  const changeTaskOnEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      titleRef.current.blur();
      titleRef.current.style.pointerEvents = "none";
    }
  };

  const startTaskChange = () => {
    titleRef.current.focus();
    titleRef.current.select();
    titleRef.current.style.pointerEvents = "all";
  };

  const finishTaskChange = useCallback(({ target }) => {
    if (titleRef.current && target !== titleRef.current) {
      titleRef.current.style.pointerEvents = "none";
    }
  }, []);

  useEffect(() => {
    titleRef.current.style.pointerEvents = "none";
    titleRef.current.style.height = titleRef.current.scrollHeight - 1 + "px";
    wrapperRef.current.style.height = titleRef.current.scrollHeight + "px";
    document.body.addEventListener("click", finishTaskChange);
    return () => document.body.removeEventListener("click", finishTaskChange);
  }, [finishTaskChange]);

  return (
    <TaskTitle
      wrapperRef={wrapperRef}
      startTaskChange={startTaskChange}
      isDragging={isDragging}
      titleRef={titleRef}
      changeTaskOnEnterPress={changeTaskOnEnterPress}
      setTaskToState={setTaskToState}
      taskContent={taskContent}
      changeTask={changeTask}
    />
  );
};
