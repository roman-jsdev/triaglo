import { useLocation } from "react-router-dom";

export const useBoardId = (id) => {
  const location = useLocation();
  const boardInitialId = id ? id : location.pathname;;
  const boardId = boardInitialId.split("/").join("");
  return [boardId];
};
