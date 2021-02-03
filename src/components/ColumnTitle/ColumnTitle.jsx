import { useCallback, useEffect, useRef } from "react";
import { useBoardState } from "../../store/BoardContext/BoardContext";
import { RemoveColumnBtn } from "../RemoveColumnBtn/RemoveColumnBtn";
import { Title, Input } from "./Styled";

export const ColumnTitle = ({ providedProps, column: { id, title } }) => {
  const { setColumnTitle } = useBoardState();
  const titleRef = useRef();

  const changeTitle = ({ target: { value } }) => {
    setColumnTitle(id, value);
    titleRef.current.style.height = "20px";
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
  };

  const changeTitleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      changeTitle(e);
      titleRef.current.blur();
      titleRef.current.style.pointerEvents = "none";
    }
  };

  const startTitleChange = () => {
    titleRef.current.focus();
    titleRef.current.select();
    titleRef.current.style.pointerEvents = "all";
  };

  const finishTitleChange = useCallback(({ target }) => {
    if (titleRef.current !== null) {
      if (target !== titleRef.current) {
        titleRef.current.style.pointerEvents = "none";
      }
    }
  }, []);

  useEffect(() => {
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    titleRef.current.style.pointerEvents = "none";
    document.body.addEventListener("click", finishTitleChange);
    return () => document.body.removeEventListener("click", finishTitleChange);
  }, [finishTitleChange]);

  return (
    <Title {...providedProps} onDoubleClick={startTitleChange}>
      <Input
        ref={titleRef}
        onChange={changeTitle}
        onKeyPress={changeTitleOnEnterPress}
        value={title}
      />
      <RemoveColumnBtn />
    </Title>
  );
};
