import { Button } from "./Styled";

export const RemoveColumnButton = ({ removeColumn }) => (
  <Button onClick={removeColumn}>
    <i className="far fa-trash-alt" />
  </Button>
);
