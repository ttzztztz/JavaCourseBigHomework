import React from "react";
import { ITaskAbstract } from "../../interfaces";
import AbstractTask from "./AbstractTask";

const TaskListItem: React.FC<{
    item: ITaskAbstract;
}> = ({ item }) => {
    return <AbstractTask item={item} isTop={false} />;
};

export default TaskListItem;
