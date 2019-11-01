import { ITaskEnumString } from "../interfaces";

export const renderStatus = (status: number) => {
    if (status === 1) {
        return "已完成";
    } else if (status === 0) {
        return "待完成";
    } else {
        return "已放弃";
    }
};

export const renderType = (type: ITaskEnumString) => {
    if (type === "INTERVAL") {
        return "临时任务";
    } else if (type === "LONG") {
        return "长期任务";
    } else if (type === "TEMP") {
        return "临时任务";
    } else {
        return "无效任务";
    }
};
