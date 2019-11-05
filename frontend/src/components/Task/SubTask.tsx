import React from "react";
import { ISubTask } from "../../interfaces";

const SubTask: React.FC<{
    item: ISubTask;
}> = ({ item }) => {
    return (
        <div className="subtask-container">
            <h2>{item.name}</h2>
            <div>{new Date(item.deadLine).toLocaleString()}</div>
            {item.subTaskList.length > 0 && <strong>子任务</strong>}
            <div>
                {item.subTaskList.map((item, index) => (
                    <SubTask item={item} key={index} />
                ))}
            </div>
        </div>
    );
};

export default SubTask;
