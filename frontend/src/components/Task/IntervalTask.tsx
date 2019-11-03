import React from "react";
import { IIntervalTask } from "../../interfaces";

const IntervalTask: React.FC<{ item: IIntervalTask }> = ({ item }) => {
    return (
        <div className="interval-task">
            <div>
                {item.cycle}
                {item.lastExecuted}
            </div>
        </div>
    );
};

export default IntervalTask;
