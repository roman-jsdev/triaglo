import { useMemo } from "react";

import { Column } from "@components/Column/Column";

export const ColumnsList = ({ column, taskMap, index }) => {
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  const listComponent = useMemo(
    () => <Column column={column} tasks={tasks} index={index} />,
    [column, tasks, index]
  );
  return listComponent;
};
