import React from "react";
import { ITempTask } from "../../interfaces";

const TempTask: React.FC<{
    item: ITempTask;
}> = ({ item }) => {
    return (
        <div className="temp-task">
            <div>{item.deadLine}</div>
        </div>
    );
};

export default TempTask;
