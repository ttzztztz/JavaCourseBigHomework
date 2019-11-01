import React, { useState } from "react";
import { ITaskList, ITaskEnumString } from "../../interfaces";

const LongTaskInput: React.FC = () => {
    return <></>;
};
const IntervalTaskInput: React.FC = () => {
    const nowDate = new Date();
    const [cycle, setCycle] = useState(0);
    const [date, setDate] = useState(`${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`);
    const [time, setTime] = useState(`${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`);

    return (
        <>
            <input type="number" value={cycle} onChange={e => setCycle(Number.parseInt(e.target.value))} />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        </>
    );
};
const TempTaskInput: React.FC = () => {
    return <></>;
};

const EditTask: React.FC<{
    lists: Array<ITaskList>;
}> = ({ lists }) => {
    const [name, setName] = useState("");
    const [lid, setLid] = useState("");
    const [type, setType] = useState("TEMP" as ITaskEnumString);
    const [description, setDescription] = useState("");

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
                <button>提交</button>
            </div>
        </>
    );
};

export default EditTask;
