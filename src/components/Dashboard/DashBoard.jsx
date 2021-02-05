import { Fragment, useEffect, useRef, useState } from "react";
import { useBoardId } from "../../hooks/useBoardId";
import { useDB } from "../../hooks/useDB";
import { useUserState } from "../../store/UserContext/UserContext";
import { Loader } from "../Loader/Loader";
import {
  Wrapper,
  BoardsWrapper,
  SideBar,
  Subtitle,
  BoardsSections,
} from "./Styled";
import { getBoardsSections, setActiveClassName, storage } from "../../utils";
import { BoardsLinks } from "../BoardsLinks";
import { tabs } from "../../constants";

export const DashBoard = () => {
  const [mounted, setMounted] = useState(false);
  const { initUserState, addBoardToUser, setUserStateLoading } = useUserState();
  const { userId } = storage();
  const [fetchUser, isDBLoading, fetchedUserData] = useDB(
    "get",
    `users/${userId}`
  );
  const sidebarRef = useRef();
  const [activeTab, setActiveTab] = useState(0);

  const generatedId = `board/${Date.now()}`;
  const boardId = useBoardId(generatedId).toString();

  const [addBoardToDB] = useDB("put", `users/${userId}/boards/${boardId}`, {
    owner: "owner",
    creationDate: Date.now(),
    title: boardId,
  });

  const routeToBoard = (type) => {
    if (type !== "new") return;
    addBoardToDB();
    addBoardToUser({
      owner: "owner",
      creationDate: Date.now(),
      title: boardId,
    });
    setUserStateLoading(true);
  };

  const onTabClick = ({ target }) => {
    setActiveClassName(sidebarRef, target);
    setActiveTab(Number(target.dataset.tab));
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
          <SideBar ref={sidebarRef}>
            {tabs.map(({ icon, title }, index) => (
              <p
                data-tab={index}
                key={index}
                onClick={onTabClick}
                className={index === 0 ? "active" : ""}
              >
                <i className={icon} />
                {title}
              </p>
            ))}
          </SideBar>
          <BoardsSections>
            {getBoardsSections(activeTab).map(
              ({ icon, title, type }, index) => (
                <Fragment key={index}>
                  <Subtitle>
                    <i className={icon} />
                    {title}
                  </Subtitle>
                  <BoardsWrapper>
                    <BoardsLinks
                      isDBLoading={isDBLoading}
                      sectionType={type}
                      generatedId={generatedId}
                      onClick={routeToBoard}
                    />
                  </BoardsWrapper>
                </Fragment>
              )
            )}
          </BoardsSections>
        </Wrapper>
      )}
    </>
  );
};
