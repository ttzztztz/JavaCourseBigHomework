import React from "react";
import { ITaskAbstract } from "../../interfaces";
import { RouteComponentProps, withRouter } from "react-router";
import { renderStatus, renderType } from "../../models/renderHelper";

const AbstractTask: React.FC<{ item: ITaskAbstract; isTop: boolean } & RouteComponentProps<{}>> = ({
    item,
    history,
    isTop
}) => {
    return (
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
            <p>{item.description}</p>
            <p>
                {renderStatus(item.status)} {renderType(item.type)}
            </p>
        </div>
    );
};

export default withRouter(AbstractTask);
