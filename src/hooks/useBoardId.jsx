import { useLocation } from "react-router-dom";

export const useBoardId = () => {
  const location = useLocation();
  const boardId = location.pathname.split("/").join("");
  return [boardId];
};
