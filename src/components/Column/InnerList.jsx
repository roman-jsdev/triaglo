import { useMemo } from "react";
import { Task } from "../Task/Task";

export const InnerList = ({ tasks }) => {
  const listComponent = useMemo(
    () =>
      tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      )),
    [tasks]
  );
  return listComponent;
};
