import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useBoardId } from "../../hooks/useBoardId";
import { useDB } from "../../hooks/useDB";
import { useUserState } from "../../store/UserContext/UserContext";
import { Loader } from "../Loader";
import { BoardLink } from "./BoardLink";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const BoardsWrapper = styled.div`
  display: flex;
  max-width: 900px;
  width: 100%;
  margin: 18px;
  flex-wrap: wrap;
`;

const SideBar = styled.div`
  position: sticky;
  top: 0;
`;

export const DashBoard = () => {
  const {
    userState,
    initUserState,
    addBoardToUser,
    setUserStateLoading,
  } = useUserState();

  const [mounted, setMounted] = useState(false);

  const userId = sessionStorage.getItem("userId");

  const [fetchUser, isLoading, responseUser] = useDB(
    "get",
    `users/${sessionStorage.getItem("userId")}`
  );

  const response = useMemo(() => userState.boards || {}, [userState.boards]);

  const getLinks = useCallback(() => {
    if (!isLoading && !userState.isLoading) {
      const boards = Object.keys(response).map((e) => e) || [];
      const links = [
        ...boards.map((e) => {
          const splitStr = e.split(/(\d+)/);
          return { to: `/${splitStr[0]}/${splitStr[1]}`, title: e };
        }),
        { to: "/", type: "new", title: "+ Add New Board" },
      ];
      return links;
    }
  }, [isLoading, response, userState.isLoading]);

  const id = `board/${Date.now()}`;
  const board = useBoardId(id).toString();

  const boardObj = { board: "owner" };

  const [addBoard] = useDB("put", `users/${userId}/boards/${board}`, boardObj);

  const handleClick = (type) => {
    if (type !== "new") return;
    addBoard();
    addBoardToUser(boardObj);
    setUserStateLoading(true);
  };

  useEffect(() => {
    if (!responseUser) {
      fetchUser();
    }
    if (!isLoading) {
      initUserState(responseUser);
    }
  }, [isLoading]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Wrapper>
          <SideBar>
            <h1>Home</h1>
          </SideBar>
          <BoardsWrapper>
            {getLinks()
              ? getLinks().map((e, i) => (
                  <BoardLink
                    key={i}
                    to={e.to}
                    title={e.title}
                    type={e.type}
                    id={id}
                    onClick={() => handleClick(e.type)}
                  />
                ))
              : null}
          </BoardsWrapper>
        </Wrapper>
      )}
    </>
  );
};
