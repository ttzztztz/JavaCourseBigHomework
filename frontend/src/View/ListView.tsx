import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ITaskAbstract, IGeneralResponse, ITaskList } from "../interfaces";
import TaskListItem from "../components/Task/ListItem";
import { TASK_LIST, LIST_OPTIONS } from "../models/urls";
import axios from "axios";

interface IParamProps {
    lid: string;
    page: string;
}

type ListViewType = {
    lists: Array<ITaskList>;
} & RouteComponentProps<IParamProps>;

const ListView: React.FC<ListViewType> = ({
    match: {
        params: { lid, page }
    },
    lists,
    history
}) => {
    const [tasks, setTasks] = useState([] as Array<ITaskAbstract>);
    let listName = "";
    if (lid === "all") {
        listName = "全部";
    } else if (lists) {
        const [listItem] = lists.filter(item => item.lid === lid);
        if (listItem) {
            listName = listItem.name;
        }
    }

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get(TASK_LIST(lid, page));
            const { message } = res.data as IGeneralResponse<Array<ITaskAbstract>>;
            setTasks(message);
        };

        fetchTasks();
    }, [lid, page]);
    const handleDeleteList = async () => {
        if (window.confirm("是否要删除这个任务列表？该列表下的所有任务都将被级联删除。")) {
            await axios.delete(LIST_OPTIONS(lid));
            alert("删除成功！");
        }
    };
    const handleEditList = () => {
        history.push({
            pathname: "/edit/list/" + lid
        });
    };

    return (
        <>
            <h1>{listName}</h1>
            {lid !== "all" && (
                <>
                    <button onClick={handleEditList}>编辑列表</button>
                    <button onClick={handleDeleteList}>删除列表</button>
                </>
            )}
            <hr />
            {tasks.map((item, index) => (
                <TaskListItem key={index} item={item} />
            ))}
        </>
    );
};

export default withRouter(ListView);
