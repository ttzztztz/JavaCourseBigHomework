import React from "react";
import { ITaskList } from "../../interfaces";
import { withRouter, RouteComponentProps } from "react-router-dom";

const TaskList: React.FC<{ all: Array<ITaskList> } & RouteComponentProps<{}>> = ({ all, history }) => {
    return (
        <div className="sidebar">
            <div className="task-list">
                {all.map((item, key) => (
                    <div key={key}>
                        <button
                            onClick={() => {
                                history.push({ pathname: "/list/" + item.lid + "/1" });
                            }}
                        >
                            {item.name}
                        </button>
                    </div>
                ))}
            </div>
            <div className="tool">
                <div>
                    <button
                        onClick={() => {
                            history.push("/create/list");
                        }}
                    >
                        添加分组
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            history.push("/create/task");
                        }}
                    >
                        添加任务
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(TaskList);
