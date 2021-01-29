import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDndState } from "../store/DndContext/DndContext";
import { RemoveColumnBtn } from "./RemoveColumnBtn";

const Title = styled.div`
  padding: 8px;
  background-color: var(--column-secondary-background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  border-bottom: 1px solid var(--column-border-color);
`;

const Input = styled.textarea`
  background-color: var(--column-secondary-background);
  border: none;
  width: 250px;
  font-family: inherit;
  font-size: 16px;
  font-weight: bold;
  cursor: grab;
  overflow-y: hidden;
  resize: none;
  height: 25px;
  &:focus {
    cursor: text;
  }
`;

export const ColumnTitle = ({ providedProps, column }) => {
  const { setColumnTitle } = useDndState();
  const titleRef = useRef();

  const handleChange = (e) => {
    titleRef.current.style.height = "20px";
    const value = e.target.value;
    const columnId = column.id;
    setColumnTitle(columnId, value);
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
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
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    titleRef.current.style.pointerEvents = "none";
    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <Title {...providedProps} onDoubleClick={handleDoubleClick}>
      <Input
        ref={titleRef}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={column.title}
      />
      <RemoveColumnBtn />
    </Title>
  );
};
