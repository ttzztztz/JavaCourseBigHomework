import React from "react";
import { ITaskAbstract } from "../../interfaces";
import { RouteComponentProps, withRouter } from "react-router";

const AbstractTask: React.FC<{ item: ITaskAbstract } & RouteComponentProps<{}>> = ({ item, history }) => {
    return (
        <div className="abstract-task">
            <h1>
                <a
                    href="#"
                    onClick={() => {
                        history.push({ pathname: "/item/" + item.tid });
                    }}
                >
                    {item.name}
                </a>
            </h1>
            <p>{item.description}</p>
            <p>
                {item.status}, {item.rank}
            </p>
        </div>
    );
};

export default withRouter(AbstractTask);
