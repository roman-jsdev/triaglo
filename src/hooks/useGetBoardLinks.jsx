import { useCallback, useMemo } from "react";
import { useUserState } from "../store/UserContext/UserContext";

export const useGetBoardsLinks = (isDBLoading) => {
  const {
    userState: { boards },
  } = useUserState();

  const currentBoards = useMemo(() => boards || {}, [boards]);

  const getLinks = useCallback(() => {
    if (!isDBLoading) {
      const boards = [...Object.keys(currentBoards)] || [];
      const links = [
        ...boards.map((board) => {
          const splitStr = board.split(/(\d+)/);
          return { to: `/${splitStr[0]}/${splitStr[1]}`, title: board };
        }),
        { to: "/", type: "new", title: "+ Add New Board" },
      ];
      return links;
    }
  }, [isDBLoading, currentBoards]);

  return [getLinks];
};
