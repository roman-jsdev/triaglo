import { BoardLink } from "@components/BoardLink/BoardLink";

import { useDB } from "@hooks/useDB";

import { useUserState } from "@store/UserContext/UserContext";

import { storage } from "@src/utils";

export const BoardLinkController = ({
  to,
  type,
  title,
  id,
  onClick,
  boardId,
}) => {
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
    <BoardLink
      onClick={onClick}
      type={type}
      id={id}
      to={to}
      title={title}
      deleteBoard={deleteBoard}
    />
  );
};
