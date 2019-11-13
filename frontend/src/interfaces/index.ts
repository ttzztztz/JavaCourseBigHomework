export interface ITaskAbstract {
  tid: string;
  lid: string;
  name: string;
  description: string;
  type: ITaskEnumString;
  rank: number;
  status: number;
  createDate: Date;
}

export interface IIntervalTask {
  tid: string;
  lastExecuted: Date;
  cycle: number;
}

export interface ISubTask<T = Date> {
  name: string;
  deadLine: T;
  subTaskList: Array<ISubTask<T>>;
  lazyTag?: boolean;
}

export interface ILongTask {
  tid: string;
  deadLine: Date;
  subTaskList: Array<ISubTask>;
}

export interface ITempTask {
  tid: string;
  deadLine: Date;
}

export interface ITaskList {
  lid: string;
  name: string;
  rank: number;
}

export interface ITaskForm {
  lid: string;
  name: string;
  description: string;
  rank: number;
}

export interface ITempTaskForm extends ITaskForm {
  deadLine: Date;
}

export interface ILongTaskForm extends ITaskForm {
  deadLine: Date;
  subTaskList: Array<ISubTask>;
}

export interface IIntervalTaskForm extends ITaskForm {
  cycle: number;
}

export interface IListForm {
  name: string;
  rank: number;
}

export interface IGeneralResponse<T> {
  code: number;
  message: T;
}

export type ITaskEnum = ITempTask | ILongTask | IIntervalTask;
export type ITaskEnumString = "TEMP" | "LONG" | "INTERVAL" | "INVALID";

export interface ITaskResponse {
  info: ITaskAbstract;
  detail: ITaskEnum;
}
