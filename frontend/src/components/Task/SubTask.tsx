import React from "react";
import { ISubTask } from "../../interfaces";

const SubTask: React.FC<{
    item: ISubTask;
}> = ({ item }) => {
    return (
        <div className="subtask-container">
            <div>{item.name}</div>
            <div>{new Date(item.deadLine).toLocaleString()}</div>
            {item.subTaskList.length > 0 && <h3>子任务</h3>}
            <div>
                {item.subTaskList.map((item, index) => (
                    <SubTask item={item} key={index} />
                ))}
            </div>
        </div>
    );
};

export default SubTask;
