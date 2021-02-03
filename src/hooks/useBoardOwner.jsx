import { useAuthState } from "../store/AuthContext/AuthContext";
import { useBoardState } from "../store/BoardContext/BoardContext";

export const useBoardOwner = () => {
  const {
    boardState: { owner },
  } = useBoardState();
  const {
    authState: { id },
  } = useAuthState();
  return [owner === id];
};
