package com.rabbit.todo.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class TempTask implements Task {
    private String tid;
    private Date deadLine;
}
