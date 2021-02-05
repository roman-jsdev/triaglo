import { useMemo } from "react";
import { Task } from "../Task/Task";

export const InnerList = ({ tasks }) =>
  useMemo(
    () =>
      tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      )),
    [tasks]
  );
