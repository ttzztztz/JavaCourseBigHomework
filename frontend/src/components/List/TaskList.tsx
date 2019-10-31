import React from "react";
import { ITaskList } from "../../interfaces";
import { withRouter, RouteComponentProps } from "react-router-dom";

const TaskList: React.FC<{ all: Array<ITaskList> } & RouteComponentProps<{}>> = ({ all, history }) => {
    return (
        <div className="task-list">
            {all.map((item, key) => (
                <div key={key}>
                    <a
                        href="#"
                        onClick={() => {
                            history.push({ pathname: "/list/" + item.lid + "/1" });
                        }}
                    >
                        {item.name}
                    </a>
                </div>
            ))}
        </div>
    );
};

export default withRouter(TaskList);
