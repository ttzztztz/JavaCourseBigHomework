import React, { useState, useEffect } from "react";
import TaskList from "../components/List/TaskList";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ITaskList, IGeneralResponse, ITaskResponse, ILongTask, ITempTask, IIntervalTask } from "../interfaces";
import { LISTS, TASK_OPTIONS } from "../models/urls";
import AbstractTask from "../components/Task/AbstractTask";
import LongTask from "../components/Task/LongTask";
import TempTask from "../components/Task/TempTask";
import IntervalTask from "../components/Task/IntervalTask";

interface ParamProps {
    tid: string;
}

const ItemView: React.FC<RouteComponentProps<ParamProps>> = ({
    match: {
        params: { tid }
    }
}) => {
    const [lists, setLists] = useState([] as Array<ITaskList>);
    const [task, setTask] = useState({
        info: {
            tid: "0",
            lid: "0",
            name: "",
            description: "",
            type: "",
            rank: 0,
            status: 0
        },
        detail: {}
    } as ITaskResponse);

    useEffect(() => {
        const fetchLists = async () => {
            const res = await fetch(LISTS, {
                method: "GET"
            });
            const { message } = (await res.json()) as IGeneralResponse<Array<ITaskList>>;
            setLists(message);
        };
        const fetchDetail = async () => {
            const res = await fetch(TASK_OPTIONS(tid), {
                method: "GET"
            });
            const { message } = (await res.json()) as IGeneralResponse<ITaskResponse>;
            setTask(message);
        };

        Promise.all([fetchLists(), fetchDetail()]);
    }, [tid]);

    return (
        <div className="list">
            <TaskList all={lists} />
            <div className="task-container">
                <AbstractTask item={task.info} />
                {task.info.type === "LONG" && <LongTask item={task.detail as ILongTask} />}
                {task.info.type === "TEMP" && <TempTask item={task.detail as ITempTask} />}
                {task.info.type === "INTERVAL" && <IntervalTask item={task.detail as IIntervalTask} />}
            </div>
        </div>
    );
};

export default withRouter(ItemView);
