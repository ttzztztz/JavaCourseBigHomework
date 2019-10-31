import React from "react";
import { IIntervalTask } from "../../interfaces";

const IntervalTask: React.FC<{ item: IIntervalTask }> = ({ item }) => {
    return (
        <div className="interval-task">
            <p>
                {item.cycle}
                {item.lastExecuted}
            </p>
        </div>
    );
};

export default IntervalTask;
