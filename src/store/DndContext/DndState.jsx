import { useReducer } from "react";
import { DndContext } from "./DndContext";
import {
  SET_COLUMN_ORDER,
  SET_NEW_SAME_COLUMN,
  SET_NEW_COLUMN,
  ADD_NEW_COLUMN,
} from "../types";
import { dndReducer } from "./dndReducer";
import { initialData } from "../../initialData";

export const DndState = ({ children }) => {
  const [dndState, dispatch] = useReducer(dndReducer, initialData);

  const setColumnOrder = (newOrder) => {
    dispatch({ type: SET_COLUMN_ORDER, payload: newOrder });
  };

  const setNewSameColumn = (newColumn) => {
    const payload = {
      ...dndState.columns,
      [newColumn.id]: newColumn,
    };
    dispatch({ type: SET_NEW_SAME_COLUMN, payload: payload });
  };

  const setNewColumn = (newStart, newFinish) => {
    const payload = {
      ...dndState.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };
    dispatch({ type: SET_NEW_COLUMN, payload: payload });
  };

  const addNewColumn = (newColumn, newOrder) => {
    const payload = {
      columns: {
        ...dndState.columns,
        ...newColumn,
      },
      order: newOrder,
    };
    dispatch({ type: ADD_NEW_COLUMN, payload: payload });
  };

  return (
    <DndContext.Provider
      value={{
        dndState,
        setColumnOrder,
        setNewSameColumn,
        setNewColumn,
        addNewColumn,
      }}
    >
      {children}
    </DndContext.Provider>
  );
};
