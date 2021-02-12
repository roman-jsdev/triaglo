import { Wrapper, Input } from "./Styled";

export const TaskTitle = ({
  wrapperRef,
  startTaskChange,
  isDragging,
  titleRef,
  changeTaskOnEnterPress,
  setTaskToState,
  taskContent,
  changeTask,
}) => (
  <Wrapper ref={wrapperRef} onDoubleClick={startTaskChange}>
    <Input
      isDragging={isDragging}
      ref={titleRef}
      onKeyPress={changeTaskOnEnterPress}
      onBlur={setTaskToState}
      value={taskContent}
      onChange={changeTask}
    />
  </Wrapper>
);
