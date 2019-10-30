package com.rabbit.todo.POJO;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class TaskForm {
    @NotBlank
    private String lid;

    @NotBlank
    private String name;
    @NotBlank
    private String description;

    private Integer rank;
}
