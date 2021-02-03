import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useBoardState } from "../../store/BoardContext/BoardContext";
import {
  AddButton,
  AddLink,
  Buttons,
  ButtonsWrapper,
  CloseButton,
  Input,
  Wrapper,
} from "./Styled";

export const AddNewColumn = () => {
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

  useOutsideClick(wrapperRef, closeButtonsWrapper);

  const addColumn = () => {
    if (!inputValue) return;
    addNewColumn(inputValue);
    closeButtonsWrapper();
    setInputValue("");
  };

  const addColumnOnEnterPress = (event) => {
    if (event.key !== "Enter" || !inputValue) return;
    addColumn();
  };

  return (
    <Wrapper ref={wrapperRef} onKeyPress={addColumnOnEnterPress}>
      <AddLink onClick={openButtonsWrapper} ref={addLinkRef}>
        <i className="fas fa-plus" /> Add new column
      </AddLink>
      <ButtonsWrapper ref={buttonsRef}>
        <Input
          value={inputValue}
          ref={inputRef}
          placeholder={"Enter title of new list..."}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Buttons>
          <AddButton onClick={addColumn}>Add List</AddButton>
          <CloseButton>
            <i className="fas fa-times" />
          </CloseButton>
        </Buttons>
      </ButtonsWrapper>
    </Wrapper>
  );
};
