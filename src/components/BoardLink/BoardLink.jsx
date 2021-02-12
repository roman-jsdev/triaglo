import { Wrapper, DeleteBtn } from "./Styled";

import { Link } from "react-router-dom";

export const BoardLink = ({ onClick, type, id, to, title, deleteBoard }) => (
  <>
    {
      <Wrapper onClick={onClick}>
        <Link to={type === "new" ? `/${id}` : to}>
          <span>{title}</span>
        </Link>
        {type !== "new" && (
          <DeleteBtn onClick={deleteBoard}>
            <i className="fas fa-trash-alt" />
          </DeleteBtn>
        )}
      </Wrapper>
    }
  </>
);
