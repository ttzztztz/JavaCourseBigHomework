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
    if (
      window.confirm(
        "是否要删除这个任务列表？该列表下的所有任务都将被级联删除。"
      )
    ) {
      await axios.delete(LIST_OPTIONS(lid));
      alert("删除成功！");
    }
  };
  const handleEditList = () => {
    history.push({
      pathname: "/edit/list/" + lid
    });
  };
  const sortDate = (type: 1 | 2) => {
    setTasks([
      ...tasks.sort(($1, $2) => {
        if (type === 1) {
          return new Date($1.createDate) < new Date($2.createDate) ? 1 : -1;
        } else {
          return new Date($1.createDate) < new Date($2.createDate) ? -1 : 1;
        }
      })
    ]);
  };
  const sortName = (type: 1 | 2) => {
    setTasks([
      ...tasks.sort(($1, $2) => {
        if (type === 1) {
          return $1.name < $2.name ? 1 : -1;
        } else {
          return $1.name < $2.name ? -1 : 1;
        }
      })
    ]);
  };
  const sortType = (type: 1 | 2) => {
    setTasks([
      ...tasks.sort(($1, $2) => {
        if (type === 1) {
          return $1.type < $2.type ? 1 : -1;
        } else {
          return $1.type < $2.type ? -1 : 1;
        }
      })
    ]);
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
      <button onClick={() => sortDate(1)}>按创建时间正序</button>
      <button onClick={() => sortDate(2)}>按创建时间倒序</button>
      <br />
      <button onClick={() => sortName(1)}>按任务名字典序正序</button>
      <button onClick={() => sortName(2)}>按任务名字典序倒序</button>
      <br />
      <button onClick={() => sortType(1)}>按任务类型正序</button>
      <button onClick={() => sortType(2)}>按任务类型倒序</button>
      <hr />
      {tasks.map((item, index) => (
        <TaskListItem key={index} item={item} />
      ))}
    </>
  );
};

export default withRouter(ListView);
