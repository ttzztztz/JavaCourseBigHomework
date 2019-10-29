package com.rabbit.todo.POJO;

import lombok.Data;

import java.util.Date;

@Data
public class TempTask implements Task {
    private String tid;
    private Date deadLine;
}
