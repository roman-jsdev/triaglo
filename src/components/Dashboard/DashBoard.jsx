import { useEffect } from "react";
import styled from "styled-components";
import { useDB } from "../../hooks/useDB";
import { useUserState } from "../../store/UserContext/UserContext";
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
  const { userState, addBoardToUser } = useUserState();
  const userId = userState.userId;

  const [fetchBoards, isLoading, response] = useDB("get", `${userId}/boards`);

  const getLinks = () => {
    if (!isLoading) {
      const fetchedBoards = response;
      const boards = Object.keys(fetchedBoards).filter((e) => e.includes('board'));
      const links = [
        ...boards.map((e) => {
          const splitStr = e.split(/(\d+)/);
          return { to: `/${splitStr[0]}/${splitStr[1]}`, title: e };
        }),
        { to: "/", type: "new", title: "+ Add New Board" },
      ];
      return links;
    }
  };

  const id = `board/${Date.now()}`;

  const handleClick = (type) => {
    if (type !== "new") return;
    addBoardToUser(id);
  };

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Wrapper>
          <SideBar>
            <h1>Home</h1>
          </SideBar>
          <BoardsWrapper>
            {getLinks().map((e, i) => (
              <BoardLink
                key={i}
                to={e.to}
                title={e.title}
                type={e.type}
                id={id}
                onClick={() => handleClick(e.type)}
              />
            ))}
          </BoardsWrapper>
        </Wrapper>
      )}
    </>
  );
};
