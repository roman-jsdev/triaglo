import { useCallback, useEffect, useRef, useState } from "react";
import { useDndState } from "../../store/DndContext/DndContext";
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
  const { addNewColumn } = useDndState();
  const [value, setValue] = useState("");
  const buttonsRef = useRef();
  const addLinkRef = useRef();
  const inputRef = useRef();
  const wrapperRef = useRef();

  const openButtonsWrapper = () => {
    buttonsRef.current.style.display =
      buttonsRef.current.style.display === "none" ? "flex" : "none";
    addLinkRef.current.style.display =
      addLinkRef.current.style.display === "block" ? "none" : "none";
    inputRef.current.focus();
    wrapperRef.current.classList.add("active-wrapper");
  };

  const closeButtonsWrapper = useCallback(() => {
    addLinkRef.current.style.display = "block";
    buttonsRef.current.style.display = "none";
    wrapperRef.current.classList.remove("active-wrapper");
  }, []);

  const onAdd = () => {
    if (!value) return;
    addNewColumn(value);
    setValue("");
    closeButtonsWrapper();
  };

  const onEnterPress = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    if (value) {
      onAdd();
    } else {
      return;
    }
  };

  const handleClick = useCallback(
    (e) => {
      if (addLinkRef.current !== null) {
        const nodes = [
          wrapperRef.current,
          addLinkRef.current,
          addLinkRef.current.firstElementChild,
          buttonsRef.current,
          inputRef.current,
          buttonsRef.current.lastElementChild,
          buttonsRef.current.lastElementChild.firstElementChild,
        ];
        if (nodes.indexOf(e.target) === -1) closeButtonsWrapper();
        setValue("");
      }
    },
    [closeButtonsWrapper]
  );

  useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <Wrapper ref={wrapperRef} onKeyPress={onEnterPress}>
      <AddLink onClick={openButtonsWrapper} ref={addLinkRef}>
        <i className="fas fa-plus"></i> Add new column
      </AddLink>
      <ButtonsWrapper ref={buttonsRef} style={{ display: "none" }}>
        <Input
          value={value}
          ref={inputRef}
          placeholder={"Enter title of new list..."}
          onChange={(e) => setValue(e.target.value)}
        />
        <Buttons>
          <AddButton onClick={onAdd}>Add List</AddButton>
          <CloseButton>
            <i className="fas fa-times"></i>
          </CloseButton>
        </Buttons>
      </ButtonsWrapper>
    </Wrapper>
  );
};
