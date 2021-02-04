import { useEffect, useState } from "react";
import { useBoardId } from "../../hooks/useBoardId";
import { useDB } from "../../hooks/useDB";
import { useUserState } from "../../store/UserContext/UserContext";
import { Loader } from "../Loader/Loader";
import { BoardLink } from "../BoardLink/BoardLink";
import { Wrapper, BoardsWrapper, SideBar } from "./Styled";
import { useGetBoardsLinks } from "../../hooks/useGetBoardLinks";
import { storage } from "../../utils";

export const DashBoard = () => {
  const [mounted, setMounted] = useState(false);
  const { initUserState, addBoardToUser, setUserStateLoading } = useUserState();
  const { userId } = storage();
  const [fetchUser, isDBLoading, fetchedUserData] = useDB(
    "get",
    `users/${userId}`
  );
  const [getLinks] = useGetBoardsLinks(isDBLoading);

  const generatedId = `board/${Date.now()}`;
  const boardId = useBoardId(generatedId).toString();

  const [addBoardToDB] = useDB("put", `users/${userId}/boards/${boardId}`, {
    board: "owner",
  });

  const routeToBoard = (type) => {
    if (type !== "new") return;
    addBoardToDB();
    addBoardToUser({ board: "owner" });
    setUserStateLoading(true);
  };

  useEffect(() => {
    if (!fetchedUserData) {
      fetchUser();
    }
    if (!isDBLoading) {
      initUserState(fetchedUserData);
    }
  }, [isDBLoading]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isDBLoading ? (
        <Loader />
      ) : (
        <Wrapper>
          <SideBar>
            <h1>Home</h1>
          </SideBar>
          <BoardsWrapper>
            {getLinks()
              ? getLinks().map(({   to, type, title   }, index) => (
                  <BoardLink
                    key={index}
                    to={to}
                    title={title}
                    type={type}
                    id={generatedId}
                    onClick={() => routeToBoard(type)}
                  />
                ))
              : null}
          </BoardsWrapper>
        </Wrapper>
      )}
    </>
  );
};
