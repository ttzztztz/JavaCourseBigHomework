package com.rabbit.todo.POJO;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Range;

@EqualsAndHashCode(callSuper = true)
@Data
public class IntervalTaskForm extends TaskForm {
    @Range(min = 1)
    private Integer cycle;
}
