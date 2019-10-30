package com.rabbit.todo.POJO;

import lombok.Data;

import java.util.Date;

@Data
public class LongTask implements Task {
    private String tid;
    private Date deadLine;

    // todo: JSON ?
    private String subTaskList;
}
