import { useCallback, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useDndState } from "../store/DndContext/DndContext";

const Input = styled.textarea(
  ({ isDragging }) => css`
    background-color: ${isDragging
      ? "var(--task-dragged-background)"
      : "var(--task-background)"};
    resize: none;
    border: none;
    overflow: hidden;
    height: max-content;
    height: 22px;
    width: 215px;
    font-family: inherit;
  `
);
const Wrapper = styled.div`
  height: 22px;
`;

export const TaskTitle = ({ task, isDragging }) => {
  const { setTaskTitle } = useDndState();
  const titleRef = useRef();
  const wrapperRef = useRef();

  const handleChange = (e) => {
    wrapperRef.current.style.height = "26px";
    titleRef.current.style.height = "18px";
    const value = e.target.value;
    const taskId = task.id;
    setTaskTitle(taskId, value);
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    wrapperRef.current.style.height = titleRef.current.scrollHeight + "px";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleChange(e);
      titleRef.current.blur();
      titleRef.current.style.pointerEvents = "none";
    }
  };

  const handleDoubleClick = () => {
    titleRef.current.focus();
    titleRef.current.select();
    titleRef.current.style.pointerEvents = "all";
  };

  const handleClick = useCallback((e) => {
    if (titleRef.current !== null) {
      if (e.target !== titleRef.current) {
        titleRef.current.style.pointerEvents = "none";
      }
    }
  }, []);

  useEffect(() => {
    titleRef.current.style.height = titleRef.current.scrollHeight - 4 + "px";
    wrapperRef.current.style.height = titleRef.current.scrollHeight + "px";
    titleRef.current.style.pointerEvents = "none";
    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <Wrapper ref={wrapperRef} onDoubleClick={handleDoubleClick}>
      <Input
        isDragging={isDragging}
        ref={titleRef}
        onKeyPress={handleKeyPress}
        value={task.content}
        onChange={handleChange}
      />
    </Wrapper>
  );
};
