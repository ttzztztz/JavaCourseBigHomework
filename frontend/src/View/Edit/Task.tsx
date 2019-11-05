import React, { useState, useEffect } from "react";
import {
    ITaskList,
    ITaskEnumString,
    ISubTask,
    IGeneralResponse,
    ITaskResponse,
    ITempTask,
    IIntervalTask,
    ILongTask
} from "../../interfaces";
import { withRouter, RouteComponentProps } from "react-router";
import axios from "axios";
import { TASK_CREATE, TASK_EDIT, TASK_OPTIONS } from "../../models/urls";
import { EnumTypeToUrlType } from "../../models/toUrlType";

const format = require("date-format");

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
        deadLineDate: format.asString("yyyy-MM-dd", realDate),
        deadLineTime: format.asString("hh:mm:ss.000", realDate)
    };
};

const DateToNumber = (date: Date | number): number => {
    if (typeof date === "number") {
        return date;
    } else {
        return date.getTime();
    }
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
    const [lid, setLid] = useState(lists.length > 0 ? lists[0].lid : "");
    const [type, setType] = useState("TEMP" as ITaskEnumString);
    const [description, setDescription] = useState("");
    const [deadLine, setDeadLine] = useState(DateToDeadLineState());
    const [cycle, setCycle] = useState(0);
    const [subTask, setSubTask] = useState([] as Array<ISubTask>);

    useEffect(() => {
        const fetchTaskInfo = async () => {
            const res = await axios.get(TASK_OPTIONS(tid));
            const { message } = res.data as IGeneralResponse<ITaskResponse>;
            const {
                info: { name, lid: _lid, type, description },
                detail
            } = message;
            setName(name);
            setLid(_lid);
            setType(type);
            setDescription(description);

            if (type === "INTERVAL") {
                const { lastExecuted: deadLine, cycle } = detail as IIntervalTask;
                setDeadLine(DateToDeadLineState(new Date(deadLine)));
                setCycle(cycle);
            } else if (type === "LONG") {
                const { deadLine, subTaskList } = detail as ILongTask;
                setDeadLine(DateToDeadLineState(new Date(deadLine)));
                setSubTask(subTaskList);
            } else if (type === "TEMP") {
                const { deadLine } = detail as ITempTask;
                setDeadLine(DateToDeadLineState(new Date(deadLine)));
            }
        };

        if (path === "/edit/task/:tid") {
            fetchTaskInfo();
        }
    }, [path, tid]);

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
        const SubTaskInputItem: React.FC<{ sub: ISubTask }> = ({ sub }) => {
            const [nameView, setNameView] = useState(sub.name);
            const [deadLineView, setDeadLineView] = useState(DateToDeadLineState(sub.deadLine));

            return (
                <div>
                    <input
                        type="text"
                        placeholder="子任务名"
                        required
                        onChange={e => {
                            sub.name = e.target.value;
                            setNameView(sub.name);
                        }}
                        value={nameView}
                    />
                    <DeadLineInput
                        deadLineState={deadLineView}
                        onChange={newState => {
                            sub.deadLine = DeadLineStateToDate(newState);
                            setDeadLineView(newState);
                        }}
                    />
                    {<SubTaskInput subTaskList={sub.subTaskList} isTop={false} currentNode={sub} />}
                </div>
            );
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
                                <SubTaskInputItem key={key} sub={sub} />
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
            const dfs = (subTask: Array<ISubTask<Date>>): Array<ISubTask<number>> => {
                const __innerDfs = (obj: ISubTask<Date>): ISubTask<number> => {
                    return {
                        ...obj,
                        subTaskList: obj.subTaskList.filter(sub => !!!sub.lazyTag).map(sub => __innerDfs(sub)),
                        deadLine: DateToNumber(obj.deadLine)
                    };
                };

                return subTask.filter(sub => !!!sub.lazyTag).map(sub => __innerDfs(sub));
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
                    deadLine: DateToNumber(DeadLineStateToDate(deadLine)),
                    subTaskList: dfs(subTask)
                };
            } else if (type === "TEMP") {
                return {
                    ...basicInfo,
                    deadLine: DateToNumber(DeadLineStateToDate(deadLine))
                };
            } else {
                return basicInfo;
            }
        };
        const body = collectReqeustBody();
        if (path === "/edit/task/:tid") {
            await axios.put(TASK_EDIT(tid, EnumTypeToUrlType(type)), body);
            alert("编辑成功！");
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
                {path !== "/edit/task/:tid" && (
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
                )}
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
