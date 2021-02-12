import { Button } from "@components/RemoveColumnButton/Styled";

export const RemoveTaskButton = ({ removeTask }) => (
  <Button onClick={removeTask}>
    <i className="far fa-trash-alt" />
  </Button>
);
