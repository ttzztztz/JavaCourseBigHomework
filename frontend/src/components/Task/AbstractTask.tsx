import React from "react";
import { ITaskAbstract } from "../../interfaces";
import { RouteComponentProps, withRouter } from "react-router";
import { renderStatus, renderType } from "../../models/renderHelper";
import axios from "axios";
import { TASK_OPTIONS } from "../../models/urls";

const AbstractTask: React.FC<{ item: ITaskAbstract; isTop: boolean } & RouteComponentProps<{}>> = ({
    item,
    history,
    isTop
}) => {
    const handleDeleteTask = async () => {
        if (window.confirm("是否要删除这个任务？")) {
            await axios.delete(TASK_OPTIONS(item.tid));
            alert("删除成功！");
        }
    };
    const handleEditTask = () => {
        history.push({
            pathname: "/edit/task/" + item.tid
        });
    };

    return (
        <>
            <div className="abstract-task">
                {!isTop && (
                    <button
                        onClick={() => {
                            history.push({ pathname: "/item/" + item.tid });
                        }}
                    >
                        {item.name}
                    </button>
                )}
                {isTop && <h1>{item.name}</h1>}
                <div className="abstract-task-description">{item.description}</div>
                <div className="abstract-task-state">
                    {renderStatus(item.status)} {renderType(item.type)}
                </div>
            </div>
            <div>
                <button onClick={handleEditTask}>编辑任务</button>
                <button onClick={handleDeleteTask}>删除任务</button>
            </div>
            <hr />
        </>
    );
};

export default withRouter(AbstractTask);
