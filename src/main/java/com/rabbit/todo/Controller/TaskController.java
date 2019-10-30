package com.rabbit.todo.Controller;

import com.rabbit.todo.POJO.GeneralResponse;
import com.rabbit.todo.POJO.TaskAbstract;
import com.rabbit.todo.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/task")
@RestController
public class TaskController {
    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/list/all/{page}")
    public GeneralResponse<List<TaskAbstract>> taskAllList(@PathVariable("page") Integer page) {
        GeneralResponse<List<TaskAbstract>> response = new GeneralResponse<>();
        response.setMessage(taskService.list(page));
        return response;
    }

    @GetMapping("/list/{lid}/{page}")
    public GeneralResponse<List<TaskAbstract>> taskList(@PathVariable("page") Integer page, @PathVariable("lid") String lid) {
        GeneralResponse<List<TaskAbstract>> response = new GeneralResponse<>();
        response.setMessage(taskService.list(page, lid));
        return response;
    }


}
