import { useUserState } from "@store/UserContext/UserContext";

export const useGetBoardsLinks = (isDBLoading, type) => {
  const {
    userState: { boards },
  } = useUserState();

  const getLinks = () => {
    if (!isDBLoading) {
      const links = Object.keys(boards || {}).map((board) => {
        const splitStr = board.split(/(\d+)/);
        return {
          to: `/${splitStr[0]}/${splitStr[1]}`,
          title: boards[board].title,
          owner: boards[board].owner,
          board,
        };
      });
      switch (type) {
        case "personal":
          return [
            ...links.reverse().filter(({ owner }) => owner === "owner"),
            { to: "/", type: "new", title: "+ Add New Board" },
          ];
        case "recent":
          return links.slice(-4).reverse();
        case "invited":
          return links.filter(({ owner }) => owner !== "owner");
        default:
          return links;
      }
    }
  };

  return [getLinks];
};
