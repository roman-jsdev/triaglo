import { createContext, useContext } from "react";

export const BoardContext = createContext();
export const useBoardState = () => useContext(BoardContext);
