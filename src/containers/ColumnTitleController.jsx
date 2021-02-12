import { useCallback, useEffect, useRef, useState } from "react";

import { ColumnTitle } from "@components/ColumnTitle/ColumnTitle";

import { useBoardState } from "@store/BoardContext/BoardContext";

export const ColumnTitleController = ({
  providedProps,
  column: { id: columnId, title },
}) => {
  const [columnTitleContent, setColumnTitleContent] = useState(title);
  const { setColumnTitle } = useBoardState();
  const titleRef = useRef();

  const changeTitle = ({ target: { value } }) => {
    setColumnTitleContent(value);
    titleRef.current.style.height = "20px";
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
  };

  const setColumnToState = () => setColumnTitle(columnId, columnTitleContent);

  const changeTitleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
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
    if (titleRef.current && target !== titleRef.current) {
      titleRef.current.style.pointerEvents = "none";
    }
  }, []);

  useEffect(() => {
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
    titleRef.current.style.pointerEvents = "none";
    document.body.addEventListener("click", finishTitleChange);
    return () => document.body.removeEventListener("click", finishTitleChange);
  }, [finishTitleChange]);

  return (
    <ColumnTitle
      providedProps={providedProps}
      startTitleChange={startTitleChange}
      titleRef={titleRef}
      changeTitle={changeTitle}
      changeTitleOnEnterPress={changeTitleOnEnterPress}
      columnTitleContent={columnTitleContent}
      setColumnToState={setColumnToState}
    />
  );
};
