export const BACKEND_URL = `http://localhost:8000`;

export type TaskType = "long" | "temp" | "interval";

export const TASK_CREATE = (type: TaskType) => `${BACKEND_URL}/task/create/${type}`;
export const TASK_EDIT = (tid: string, type: TaskType) => `${BACKEND_URL}/task/${tid}/${type}`;
export const TASK_OPTIONS = (tid: string) => `${BACKEND_URL}/task/${tid}`;
export const TASK_LIST = (lid: string, page: string) => `${BACKEND_URL}/task/list/${lid}/${page}`;

export const LISTS = `${BACKEND_URL}/list/`;
export const LIST_OPTIONS = (lid: string) => `${BACKEND_URL}/list/${lid}`;
export const LIST_CREATE = `${BACKEND_URL}/list/create`;
