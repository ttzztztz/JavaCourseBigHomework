package com.rabbit.todo.Controller;

import com.rabbit.todo.POJO.TaskAbstract;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/task")
@RestController
public class TaskController {

    @GetMapping("/list/{page}")
    public List<TaskAbstract> taskList(@PathVariable("page") Integer page) {
        return null;
    }
}
