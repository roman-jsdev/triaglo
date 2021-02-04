import { useAuthState } from "../store/AuthContext/AuthContext";
import { useBoardState } from "../store/BoardContext/BoardContext";

export const useBoardOwner = () => {
  const {
    boardState: { owner: boardOwner },
  } = useBoardState();
  const {
    authState: { id: userId },
  } = useAuthState();
  return [boardOwner === userId];
};
