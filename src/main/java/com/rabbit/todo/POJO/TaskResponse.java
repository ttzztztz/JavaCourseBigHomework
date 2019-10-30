package com.rabbit.todo.POJO;

import lombok.Data;

@Data
public class TaskResponse<T extends Task> {
    private TaskAbstract info;
    private T detail;
}
