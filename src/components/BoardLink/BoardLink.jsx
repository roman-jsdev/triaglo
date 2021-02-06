import { useDB } from "@hooks/useDB";
import { useUserState } from "@store/UserContext/UserContext";
import { storage } from "@src/utils";
import { Wrapper, DeleteBtn } from "./Styled";
import { Link } from "react-router-dom";

export const BoardLink = ({ to, type, title, id, onClick, boardId }) => {
  const { userId } = storage();
  const currentUserId = userId;

  const {
    userState: { boards },
    removeBoardFromUser,
  } = useUserState();

  const [deleteFromUserDB] = useDB(
    "delete",
    `users/${currentUserId}/boards/${boardId}`
  );

  const [deleteFromBoardDB] = useDB("delete", `boards/${boardId}`);

  const deleteBoard = () => {
    if (boards[boardId].owner === "owner") {
      removeBoardFromUser(boardId);
      deleteFromUserDB();
      deleteFromBoardDB();
    } else {
      removeBoardFromUser(boardId);
      deleteFromUserDB();
    }
  };

  return (
    <>
      {
        <Wrapper onClick={onClick}>
          <Link to={type === "new" ? `/${id}` : to}>
            <span>{title}</span>
          </Link>
          {type === "new" ? null : (
            <DeleteBtn onClick={deleteBoard}>
              <i className="fas fa-trash-alt" />
            </DeleteBtn>
          )}
        </Wrapper>
      }
    </>
  );
};
