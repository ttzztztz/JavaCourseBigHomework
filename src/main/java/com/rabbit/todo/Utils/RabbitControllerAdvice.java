package com.rabbit.todo.Utils;

import com.rabbit.todo.POJO.GeneralResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice(
        basePackages = {"com.rabbit.todo.Controller.*"},
        annotations = {Controller.class, RestController.class}
)
public class RabbitControllerAdvice {
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public GeneralResponse<String> handleException(HttpServletRequest _request, Exception ex) {
        GeneralResponse<String> response = new GeneralResponse<>();

        response.setCode(500);
        response.setMessage(ex.getMessage());

        return response;
    }
}
