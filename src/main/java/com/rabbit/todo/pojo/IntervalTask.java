package com.rabbit.todo.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class IntervalTask implements Task {
    private String tid;
    private Date lastExecuted;
    private Integer cycle;
}
