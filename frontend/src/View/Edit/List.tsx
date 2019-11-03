import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { LIST_OPTIONS, LIST_CREATE, LIST_INFO } from "../../models/urls";
import axios from "axios";
import { IGeneralResponse, ITaskList } from "../../interfaces";

interface ParamProps {
    lid: string;
}

const EditList: React.FC<RouteComponentProps<ParamProps>> = ({
    match: {
        path,
        params: { lid }
    },
    history
}) => {
    const [name, setName] = useState("");
    const handleSubmit = () => {
        const editList = async () => {
            await axios.post(LIST_OPTIONS(lid), {
                name,
                rank: 1
            });
            alert("修改成功！");
            history.push({
                pathname: "/list/all/1"
            });
        };

        const createList = async () => {
            await axios.post(LIST_CREATE, {
                name,
                rank: 1
            });
            alert("创建成功！");
            history.push({
                pathname: "/list/all/1"
            });
        };

        if (path === "/create/list") {
            createList();
        } else if (path === "/edit/list/:lid") {
            editList();
        }
    };

    useEffect(() => {
        const fetchLists = async () => {
            const res = await axios.get(LIST_INFO(lid));
            const { message } = res.data as IGeneralResponse<ITaskList>;
            setName(message.name);
        };

        if (path === "/edit/list/:lid") {
            fetchLists();
        }
    }, [path, lid]);

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="组名"
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
            </div>
            <div>
                <button onClick={handleSubmit}>提交</button>
            </div>
        </>
    );
};

export default withRouter(EditList);
