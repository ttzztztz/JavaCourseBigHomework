package com.rabbit.todo.POJO;

import lombok.Data;

@Data
public class GeneralResponse<T> {
    private Integer code = 200;
    private T message;
}
