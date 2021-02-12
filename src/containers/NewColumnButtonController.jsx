import { useRef, useState } from "react";

import { NewColumnButton } from "@components/NewColumnButton/NewColumnButton";

import { useOutsideClick } from "@hooks/useOutsideClick";

import { useBoardState } from "@store/BoardContext/BoardContext";

export const NewColumnButtonController = () => {
  const { addNewColumn } = useBoardState();
  const [inputValue, setInputValue] = useState("");
  const buttonsRef = useRef();
  const addLinkRef = useRef();
  const inputRef = useRef();
  const wrapperRef = useRef();

  const openButtonsWrapper = () => {
    wrapperRef.current.classList.add("active");
    buttonsRef.current.classList.add("show");
    addLinkRef.current.classList.add("hide");
    inputRef.current.focus();
  };

  const closeButtonsWrapper = () => {
    wrapperRef.current.classList.remove("active");
    buttonsRef.current.classList.remove("show");
    addLinkRef.current.classList.remove("hide");
    setInputValue("");
  };

  const changeInputValue = ({ target: { value } }) => setInputValue(value);

  useOutsideClick(wrapperRef, closeButtonsWrapper);

  const addColumn = () => {
    if (!inputValue) return;
    addNewColumn(inputValue);
    closeButtonsWrapper();
    setInputValue("");
  };

  const addColumnOnEnterPress = ({ key }) => {
    if (key !== "Enter" || !inputValue) return;
    addColumn();
  };
  return (
    <NewColumnButton
      wrapperRef={wrapperRef}
      addColumnOnEnterPress={addColumnOnEnterPress}
      openButtonsWrapper={openButtonsWrapper}
      closeButtonsWrapper={closeButtonsWrapper}
      addLinkRef={addLinkRef}
      buttonsRef={buttonsRef}
      inputValue={inputValue}
      changeInputValue={changeInputValue}
      inputRef={inputRef}
      addColumn={addColumn}
    />
  );
};
