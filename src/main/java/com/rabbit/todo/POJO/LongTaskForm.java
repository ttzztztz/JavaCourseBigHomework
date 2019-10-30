package com.rabbit.todo.POJO;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class LongTaskForm extends TaskForm {
    private Date deadLine;

    // todo: JSON ?
    private String subTaskList;
}
