import React from "react";
import { ILongTask } from "../../interfaces";
import SubTask from "./SubTask";

const LongTask: React.FC<{ item: ILongTask }> = ({ item }) => {
    return (
        <div className="long-task">
            <div>{new Date(item.deadLine).toLocaleString()}</div>
            <h3>子任务</h3>
            <div>
                {item.subTaskList.map((item, key) => (
                    <SubTask key={key} item={item} />
                ))}
            </div>
        </div>
    );
};

export default LongTask;
