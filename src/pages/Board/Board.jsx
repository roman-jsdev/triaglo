import { useEffect } from "react";

import { BoardTemplate } from "@components/BoardTemplate/BoardTemplate";

import { useAccessBoard } from "@hooks/useAccessBoard";
import { useOnDragEnd } from "@hooks/useOnDragEnd";

import { useBoardState } from "@store/BoardContext/BoardContext";
import { useAuthState } from "../../store/AuthContext/AuthContext";

export const Board = () => {
  const {
    boardState: { isLoading, columnOrder, columns, tasks },
    fetchInitialState,
  } = useBoardState();

  const {
    authState: { token: isLoggedIn },
  } = useAuthState();

  const [couldAccess] = useAccessBoard();
  const [onDragEnd] = useOnDragEnd();

  useEffect(() => {
    if (isLoading) {
      fetchInitialState();
    }
    document.body.style.backgroundColor = "var(--main-light-background)";
    if (!isLoggedIn && !couldAccess) {
      document.querySelector("nav").style.backgroundColor =
        "var(--main-light-background)";
    }
    return () => (document.body.style.backgroundColor = "inherit");
  }, [fetchInitialState, isLoading]);

  return (
    <BoardTemplate
      isLoading={isLoading}
      couldAccess={couldAccess}
      onDragEnd={onDragEnd}
      columnOrder={columnOrder}
      columns={columns}
      tasks={tasks}
    />
  );
};
