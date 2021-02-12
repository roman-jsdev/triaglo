import { Input, ButtonsWrapper, AddButton } from "./Styled";

export const NewTaskButton = ({
  addTaskOnEnterPress,
  inputValue,
  changeInputValue,
  addTask,
}) => (
  <ButtonsWrapper onKeyPress={addTaskOnEnterPress}>
    <Input
      value={inputValue}
      onChange={changeInputValue}
      placeholder="Enter title of new task..."
    />
    <AddButton onClick={addTask}>Add task</AddButton>
  </ButtonsWrapper>
);
