package com.rabbit.todo.Exception;

public class InvalidTypeException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private String errMessage;

    public InvalidTypeException(String errMessage) {
        super();
        this.errMessage = errMessage;
    }

    public String getErrMessage() {
        return this.errMessage;
    }
}
