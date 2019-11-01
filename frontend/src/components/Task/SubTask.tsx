import React from "react";
import { ISubTask } from "../../interfaces";

const SubTask: React.FC<{
    item: ISubTask;
}> = ({ item }) => {
    return (
        <div className="subtask-container">
            <p>{item.name}</p>
            <p>{new Date(item.deadLine).toLocaleString()}</p>
            {item.subTaskList.length > 0 && <h3>子任务</h3>}
            <p>
                {item.subTaskList.map((item, index) => (
                    <SubTask item={item} key={index} />
                ))}
            </p>
        </div>
    );
};

export default SubTask;
