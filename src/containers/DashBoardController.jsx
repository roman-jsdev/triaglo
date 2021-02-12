import { useEffect, useRef, useState } from "react";

import { DashBoard } from "@components/Dashboard/DashBoard";

import { useBoardId } from "@hooks/useBoardId";
import { useDB } from "@hooks/useDB";

import { useUserState } from "@store/UserContext/UserContext";

import { setActiveClassName, storage } from "@src/utils";

export const DashBoardController = () => {
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
    <DashBoard
      isDBLoading={isDBLoading}
      sidebarRef={sidebarRef}
      onTabClick={onTabClick}
      activeTab={activeTab}
      generatedId={generatedId}
      routeToBoard={routeToBoard}
    />
  );
};
