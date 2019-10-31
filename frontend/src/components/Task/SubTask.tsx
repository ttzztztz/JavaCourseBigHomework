import React from "react";
import { ISubTask } from "../../interfaces";

const SubTask: React.FC<{
    item: ISubTask;
}> = ({ item }) => {
    return (
        <div className="subtask-container">
            <p>{item.name}</p>
            <p>{item.deadLine}</p>
            <p>
                {item.subTaskList.map((item, index) => (
                    <SubTask item={item} key={index} />
                ))}
            </p>
        </div>
    );
};

export default SubTask;
