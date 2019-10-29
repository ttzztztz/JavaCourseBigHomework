package com.rabbit.todo.POJO;

import lombok.Data;

import java.util.Date;

@Data
public class IntervalTask implements Task {
    private String tid;
    private Date lastExecuted;
    private Integer cycle;
}
