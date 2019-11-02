import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ITaskAbstract, IGeneralResponse } from "../interfaces";
import TaskListItem from "../components/Task/ListItem";
import { TASK_LIST } from "../models/urls";
import axios from "axios";

interface ParamProps {
    lid: string;
    page: string;
}

const ListView: React.FC<RouteComponentProps<ParamProps>> = ({
    match: {
        params: { lid, page }
    }
}) => {
    const [tasks, setTasks] = useState([] as Array<ITaskAbstract>);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get(TASK_LIST(lid, page));
            const { message } = res.data as IGeneralResponse<Array<ITaskAbstract>>;
            setTasks(message);
        };

        fetchTasks();
    }, [lid, page]);

    return (
        <>
            {tasks.map((item, index) => (
                <TaskListItem key={index} item={item} />
            ))}
        </>
    );
};

export default withRouter(ListView);
