package com.rabbit.todo.pojo;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class LongTaskForm extends TaskForm {
    private Date deadLine;
    private List<SubTask> subTaskList;
}
