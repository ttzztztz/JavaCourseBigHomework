package com.rabbit.todo.pojo;

import lombok.Data;

@Data
public class TaskAbstract implements Task {
    private String tid;
    private String lid;

    private String name;
    private String description;

    // temp & interval & long
    private String type;
    private Integer rank;

    // [-1, 1] tinyint
    private Integer status;
}
