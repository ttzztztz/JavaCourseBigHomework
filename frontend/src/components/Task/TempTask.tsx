import React from "react";
import { ITempTask } from "../../interfaces";

const TempTask: React.FC<{
    item: ITempTask;
}> = ({ item }) => {
    return (
        <div className="temp-task">
            <p>{item.deadLine}</p>
        </div>
    );
};

export default TempTask;
