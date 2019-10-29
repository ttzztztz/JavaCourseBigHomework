package com.rabbit.todo.POJO;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class LongTask implements Task {
    private String tid;
    private Date deadLine;
    private List<SubTask> subTaskList;
}
