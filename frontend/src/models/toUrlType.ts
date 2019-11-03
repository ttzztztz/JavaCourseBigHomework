import { TaskType } from "./urls";
import { ITaskEnumString } from "../interfaces";

export const EnumTypeToUrlType = (type: ITaskEnumString): TaskType => {
    if (type === "INTERVAL") {
        return "interval";
    } else if (type === "LONG") {
        return "long";
    } else if (type === "TEMP") {
        return "temp";
    } else {
        return "temp";
    }
};
