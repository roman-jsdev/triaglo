import { useAuthState } from "@store/AuthContext/AuthContext";
import { useBoardState } from "@store/BoardContext/BoardContext";

export const useAccessBoard = () => {
  const {
    boardState: { invited = [], owner },
  } = useBoardState();
  const {
    authState: { id, email, token },
  } = useAuthState();

  return [(owner === id && !!token) || (invited.includes(email) && !!token)];
};
