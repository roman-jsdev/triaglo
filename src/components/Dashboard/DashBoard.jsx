import styled from "styled-components";
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
  const items = { ...localStorage };
  const links = [
    ...Object.keys(items).map((e) => {
      const splitStr = e.split(/(\d+)/);
      return { to: `/${splitStr[0]}/${splitStr[1]}`, title: e };
    }),
    { to: "/", type: "new", title: "+ Add New Board" },
  ];

  return (
    <Wrapper>
      <SideBar>
        <h1>Home</h1>
      </SideBar>
      <BoardsWrapper>
        {links.map((e, i) => (
          <BoardLink key={i} to={e.to} title={e.title} type={e.type} />
        ))}
      </BoardsWrapper>
    </Wrapper>
  );
};
