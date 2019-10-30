package com.rabbit.todo.POJO;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ListForm {
    @NotBlank
    private String name;

    @NotNull
    private Integer rank;
}
