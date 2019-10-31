import React from "react";
import { ILongTask } from "../../interfaces";
import SubTask from "./SubTask";

const LongTask: React.FC<{ item: ILongTask }> = ({ item }) => {
    return (
        <div className="long-task">
            <p>{item.deadLine}</p>
            <div>
                {item.subTaskList.map((item, key) => (
                    <SubTask key={key} item={item} />
                ))}
            </div>
        </div>
    );
};

export default LongTask;
