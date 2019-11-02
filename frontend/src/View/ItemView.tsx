import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IGeneralResponse, ITaskResponse, ILongTask, ITempTask, IIntervalTask } from "../interfaces";
import { TASK_OPTIONS } from "../models/urls";
import AbstractTask from "../components/Task/AbstractTask";
import LongTask from "../components/Task/LongTask";
import TempTask from "../components/Task/TempTask";
import IntervalTask from "../components/Task/IntervalTask";
import axios from "axios";

interface ParamProps {
    tid: string;
}

const ItemView: React.FC<RouteComponentProps<ParamProps>> = ({
    match: {
        params: { tid }
    }
}) => {
    const [task, setTask] = useState({
        info: {
            tid: "0",
            lid: "0",
            name: "",
            description: "",
            type: "INVALID",
            rank: 0,
            status: 0
        },
        detail: {}
    } as ITaskResponse);

    useEffect(() => {
        const fetchDetail = async () => {
            const res = await axios.get(TASK_OPTIONS(tid));
            const { message } = res.data as IGeneralResponse<ITaskResponse>;
            setTask(message);
        };

        fetchDetail();
    }, [tid]);

    return (
        <>
            <AbstractTask item={task.info} isTop={true} />
            {task.info.type === "LONG" && <LongTask item={task.detail as ILongTask} />}
            {task.info.type === "TEMP" && <TempTask item={task.detail as ITempTask} />}
            {task.info.type === "INTERVAL" && <IntervalTask item={task.detail as IIntervalTask} />}
        </>
    );
};

export default withRouter(ItemView);
