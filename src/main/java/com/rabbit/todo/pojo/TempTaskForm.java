package com.rabbit.todo.pojo;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class TempTaskForm extends TaskForm {
    private Date deadLine;
}
