import {
  AddButton,
  AddLink,
  Buttons,
  ButtonsWrapper,
  CloseButton,
  Input,
  Wrapper,
} from "./Styled";

export const NewColumnButton = ({
  wrapperRef,
  addColumnOnEnterPress,
  openButtonsWrapper,
  closeButtonsWrapper,
  addLinkRef,
  buttonsRef,
  inputValue,
  changeInputValue,
  inputRef,
  addColumn,
}) => (
  <Wrapper ref={wrapperRef} onKeyPress={addColumnOnEnterPress}>
    <AddLink onClick={openButtonsWrapper} ref={addLinkRef}>
      <i className="fas fa-plus" /> Add new column
    </AddLink>
    <ButtonsWrapper ref={buttonsRef}>
      <Input
        value={inputValue}
        ref={inputRef}
        placeholder={"Enter title of new list..."}
        onChange={changeInputValue}
      />
      <Buttons>
        <AddButton onClick={addColumn}>Add List</AddButton>
        <CloseButton onClick={closeButtonsWrapper}>
          <i className="fas fa-times" />
        </CloseButton>
      </Buttons>
    </ButtonsWrapper>
  </Wrapper>
);
