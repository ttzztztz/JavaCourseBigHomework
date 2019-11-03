import React, { useState } from "react";
import { ITaskList, ITaskEnumString, ISubTask } from "../../interfaces";
import { withRouter, RouteComponentProps } from "react-router";
import axios from "axios";
import { TASK_CREATE } from "../../models/urls";
import { EnumTypeToUrlType } from "../../models/toUrlType";

interface DeadLineState {
    deadLineDate: string;
    deadLineTime: string;
}
type SetDeadLineState = React.Dispatch<React.SetStateAction<DeadLineState>>;

const DeadLineInput: React.FC<{
    deadLineState: DeadLineState;
    setDeadLineState?: SetDeadLineState;
    onChange?: (state: DeadLineState) => void;
}> = ({ deadLineState, setDeadLineState, onChange }) => {
    return (
        <>
            <input
                type="date"
                value={deadLineState.deadLineDate}
                onChange={e => {
                    const newState = { ...deadLineState, deadLineDate: e.target.value };
                    if (setDeadLineState) {
                        setDeadLineState(newState);
                    }
                    if (onChange) {
                        onChange(newState);
                    }
                }}
            />
            <input
                type="time"
                value={deadLineState.deadLineTime}
                onChange={e => {
                    const newState = { ...deadLineState, deadLineTime: e.target.value };
                    if (setDeadLineState) {
                        setDeadLineState(newState);
                    }
                    if (onChange) {
                        onChange(newState);
                    }
                }}
            />
        </>
    );
};

const DateToDeadLineState = (date?: Date): DeadLineState => {
    const rawDate = date || new Date();
    const realDate = new Date(rawDate);

    return {
        deadLineDate: `${realDate.getFullYear()}-${realDate.getMonth() + 1}-${realDate.getDate()}`,
        deadLineTime: `${realDate.getHours()}:${realDate.getMinutes()}:${realDate.getSeconds()}`
    };
};

const DeadLineStateToDate = (state: DeadLineState): Date => {
    return new Date(state.deadLineDate + " " + state.deadLineTime);
};

interface ParamProps {
    tid: string;
}

type EditTaskProps = {
    lists: Array<ITaskList>;
} & RouteComponentProps<ParamProps>;

const EditTask: React.FC<EditTaskProps> = ({
    lists,
    match: {
        path,
        params: { tid }
    }
}) => {
    const [name, setName] = useState("");
    const [lid, setLid] = useState("");
    const [type, setType] = useState("TEMP" as ITaskEnumString);
    const [description, setDescription] = useState("");
    const [deadLine, setDeadLine] = useState(DateToDeadLineState());
    const [cycle, setCycle] = useState(0);
    const [subTask, setSubTask] = useState([] as Array<ISubTask>);

    const SubTaskInput: React.FC<{ subTaskList: Array<ISubTask>; isTop: boolean; currentNode?: ISubTask }> = ({
        subTaskList,
        isTop,
        currentNode
    }) => {
        const handleAddSubTask = () => {
            subTaskList.push({
                name: "",
                deadLine: new Date(),
                subTaskList: []
            });
            setSubTask([...subTask]);
        };
        const handleDeleteSubTask = () => {
            currentNode!.lazyTag = true;
            setSubTask([...subTask]);
        };
        return (
            <>
                <div>
                    <button onClick={handleAddSubTask}>添加子任务</button>
                    {!isTop && (
                        <button
                            onClick={() => {
                                if (window.confirm("确定要删除该子任务吗？该子任务的子任务都将被级联删除。")) {
                                    handleDeleteSubTask();
                                }
                            }}
                        >
                            删除子任务
                        </button>
                    )}
                </div>
                {subTaskList.length > 0 && (
                    <div className="subtask-container">
                        {subTaskList
                            .filter(sub => !!!sub.lazyTag)
                            .map((sub, key) => (
                                <div key={key}>
                                    <input
                                        type="text"
                                        placeholder="子任务名"
                                        required
                                        onChange={e => {
                                            sub.name = e.target.value;
                                            setSubTask([...subTask]);
                                        }}
                                        value={sub.name}
                                    />
                                    <DeadLineInput
                                        deadLineState={DateToDeadLineState(sub.deadLine)}
                                        onChange={newState => {
                                            sub.deadLine = DeadLineStateToDate(newState);
                                            setSubTask([...subTask]);
                                        }}
                                    />
                                    {<SubTaskInput subTaskList={sub.subTaskList} isTop={false} currentNode={sub} />}
                                </div>
                            ))}
                    </div>
                )}
            </>
        );
    };
    const TempTaskInput: React.FC = () => {
        return (
            <>
                <DeadLineInput deadLineState={deadLine} setDeadLineState={setDeadLine} />
            </>
        );
    };
    const IntervalTaskInput: React.FC = () => {
        return (
            <>
                <input type="number" value={cycle} onChange={e => setCycle(Number.parseInt(e.target.value))} />
                <DeadLineInput deadLineState={deadLine} setDeadLineState={setDeadLine} />
            </>
        );
    };
    const LongTaskInput: React.FC = () => {
        return (
            <>
                <DeadLineInput deadLineState={deadLine} setDeadLineState={setDeadLine} />
                <SubTaskInput subTaskList={subTask} isTop={true} />
            </>
        );
    };
    const handleSubmit = async () => {
        const collectReqeustBody = () => {
            const dfs = (subTask: Array<ISubTask>): Array<ISubTask> => {
                const __innerDfs = (subTask: ISubTask) => {
                    // this subTask must exist and lazytag is false
                    subTask.subTaskList = subTask.subTaskList.filter(sub => !!!sub.lazyTag);
                    subTask.subTaskList.forEach(sub => __innerDfs(sub));
                };

                const result = subTask.filter(sub => !!!sub.lazyTag);
                result.forEach(sub => __innerDfs(sub));
                return result;
            };

            const basicInfo = {
                lid,
                name,
                description,
                rank: 1
            };

            if (type === "INTERVAL") {
                return {
                    ...basicInfo,
                    cycle
                };
            } else if (type === "LONG") {
                return {
                    ...basicInfo,
                    deadLine: DeadLineStateToDate(deadLine),
                    subTaskList: dfs(subTask)
                };
            } else if (type === "TEMP") {
                return {
                    ...basicInfo,
                    deadLine: DeadLineStateToDate(deadLine)
                };
            } else {
                return basicInfo;
            }
        };
        const body = collectReqeustBody();
        if (path === "/edit/task/:tid") {
        } else if (path === "/create/task") {
            await axios.post(TASK_CREATE(EnumTypeToUrlType(type)), body);
            alert("添加成功！");
        }
    };

    return (
        <>
            <div className="edit-task-container">
                <select
                    name="type"
                    defaultValue={lists.length >= 1 ? lists[0].lid : ""}
                    onChange={e => setLid(e.target.value)}
                >
                    {lists.map(item => (
                        <option value={item.lid} key={item.lid} defaultChecked={lid === item.lid}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <input type="text" placeholder="任务名" required onChange={e => setName(e.target.value)} value={name} />
                <textarea
                    placeholder="任务描述"
                    required
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                />
                <select
                    name="type"
                    defaultValue="TEMP"
                    required
                    onChange={e => setType(e.target.value as ITaskEnumString)}
                >
                    <option value="LONG">长期任务</option>
                    <option value="INTERVAL">周期任务</option>
                    <option value="TEMP">临时任务</option>
                </select>
                {type === "INTERVAL" && <IntervalTaskInput />}
                {type === "LONG" && <LongTaskInput />}
                {type === "TEMP" && <TempTaskInput />}
            </div>
            <div>
                <button onClick={handleSubmit}>提交</button>
            </div>
        </>
    );
};

export default withRouter(EditTask);
