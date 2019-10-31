import React, { useState, useEffect } from "react";
import TaskList from "../components/List/TaskList";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ITaskList, ITaskAbstract, IGeneralResponse } from "../interfaces";
import TaskListItem from "../components/Task/ListItem";
import { LISTS, TASK_LIST } from "../models/urls";

interface ParamProps {
    lid: string;
    page: string;
}

const ListView: React.FC<RouteComponentProps<ParamProps>> = ({
    match: {
        params: { lid, page }
    }
}) => {
    const [lists, setLists] = useState([] as Array<ITaskList>);
    const [tasks, setTasks] = useState([] as Array<ITaskAbstract>);

    useEffect(() => {
        const fetchLists = async () => {
            const res = await fetch(LISTS, {
                method: "GET"
            });
            const { message } = (await res.json()) as IGeneralResponse<Array<ITaskList>>;
            setLists(message);
        };
        const fetchTasks = async () => {
            const res = await fetch(TASK_LIST(lid, page), {
                method: "GET"
            });
            const { message } = (await res.json()) as IGeneralResponse<Array<ITaskAbstract>>;
            setTasks(message);
        };

        Promise.all([fetchLists(), fetchTasks()]);
    }, [lid, page]);

    return (
        <div className="list">
            <TaskList all={lists} />
            <div className="task-container">
                {tasks.map((item, index) => (
                    <TaskListItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default withRouter(ListView);
