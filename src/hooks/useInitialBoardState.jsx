import { initialData } from "../initialData";
import { useBoardId } from "./useBoardId";

export const useInitialBoardState = () => {
  const [boardId] = useBoardId();
  if (boardId) {
    if (localStorage.getItem(boardId)) {
      const response = localStorage.getItem(boardId);
      const initialState = JSON.parse(response);
      return [initialState];
    } else {
      localStorage.setItem(boardId, JSON.stringify(initialData));
      const initialState = initialData;
      return [initialState];
    }
  }
};
