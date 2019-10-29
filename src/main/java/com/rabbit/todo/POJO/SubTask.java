package com.rabbit.todo.POJO;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
class SubTask {
    private String name;
    private Date deadLine;
    private List<SubTask> subTaskList;
}
