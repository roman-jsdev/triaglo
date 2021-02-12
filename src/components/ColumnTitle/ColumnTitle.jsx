import { RemoveColumnButtonController } from "@containers/RemoveColumnButtonController";

import { Title, Input } from "./Styled";

export const ColumnTitle = ({
  providedProps,
  startTitleChange,
  titleRef,
  changeTitle,
  changeTitleOnEnterPress,
  columnTitleContent,
  setColumnToState,
}) => (
  <Title {...providedProps} onDoubleClick={startTitleChange}>
    <Input
      ref={titleRef}
      onChange={changeTitle}
      onKeyPress={changeTitleOnEnterPress}
      value={columnTitleContent}
      onBlur={setColumnToState}
    />
    <RemoveColumnButtonController />
  </Title>
);
