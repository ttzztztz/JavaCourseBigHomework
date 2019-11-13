import React from "react";
import { ITaskList } from "../../interfaces";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface ITaskListProps extends RouteComponentProps<{}> {
  all: Array<ITaskList>;
  sortAsc: () => void;
  sortDesc: () => void;
}

const TaskList: React.FC<ITaskListProps> = ({
  all,
  history,
  sortAsc,
  sortDesc
}) => {
  return (
    <div className="sidebar">
      <div className="task-all-container">
        <button
          onClick={() => {
            history.push("/list/all/1");
          }}
        >
          全部
        </button>
      </div>
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
              sortAsc();
            }}
          >
            分组按字典序正序
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              sortDesc();
            }}
          >
            分组按字典序倒序
          </button>
        </div>
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
