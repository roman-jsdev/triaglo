import { useLocation } from "react-router-dom";

export const useBoardId = (id) => {
  const { pathname } = useLocation();
  const boardInitialId = id ? id : pathname;
  return [boardInitialId.split("/").join("")];
};
;