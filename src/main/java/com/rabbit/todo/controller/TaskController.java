package com.rabbit.todo.controller;

import com.alibaba.fastjson.JSONArray;
import com.rabbit.todo.exception.InvalidTypeException;
import com.rabbit.todo.pojo.*;
import com.rabbit.todo.service.TaskService;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @GetMapping("/{tid}")
    public GeneralResponse<TaskResponse> task(@PathVariable("tid") String tid) throws InvalidTypeException {
        GeneralResponse<TaskResponse> response = new GeneralResponse<>();
        response.setMessage(taskService.taskResponse(tid));
        return response;
    }

    @DeleteMapping("/{tid}")
    public GeneralResponse<String> deleteTask(@PathVariable("tid") String tid) throws InvalidTypeException {
        GeneralResponse<String> response = new GeneralResponse<>();
        taskService.delete(tid);
        response.setMessage(tid);
        return response;
    }

    @PostMapping("/create/long")
    public GeneralResponse<String> createLongTask(@RequestBody @Valid LongTaskForm form) throws NotFoundException {
        GeneralResponse<String> response = new GeneralResponse<>();

        TaskAbstract taskAbstract = taskService.convertTaskFormToTaskAbstract(form, "LONG");
        LongTask longTask = new LongTask();
        longTask.setDeadLine(form.getDeadLine());
        longTask.setSubTaskList((JSONArray) JSONArray.toJSON(form.getSubTaskList()));
        taskService.insertLongTask(taskAbstract, longTask);
        response.setMessage(taskAbstract.getTid());
        return response;
    }

    @PostMapping("/create/temp")
    public GeneralResponse<String> createTempTask(@RequestBody @Valid TempTaskForm form) throws NotFoundException {
        GeneralResponse<String> response = new GeneralResponse<>();

        TaskAbstract taskAbstract = taskService.convertTaskFormToTaskAbstract(form, "TEMP");
        TempTask tempTask = new TempTask();
        tempTask.setDeadLine(form.getDeadLine());

        taskService.insertTempTask(taskAbstract, tempTask);
        response.setMessage(taskAbstract.getTid());
        return response;
    }

    @PostMapping("/create/interval")
    public GeneralResponse<String> createIntervalTask(@RequestBody @Valid IntervalTaskForm form) throws NotFoundException {
        GeneralResponse<String> response = new GeneralResponse<>();

        TaskAbstract taskAbstract = taskService.convertTaskFormToTaskAbstract(form, "INTERVAL");
        IntervalTask intervalTask = new IntervalTask();
        intervalTask.setCycle(form.getCycle());

        taskService.insertIntervalTask(taskAbstract, intervalTask);
        response.setMessage(taskAbstract.getTid());
        return response;
    }

    @PutMapping("/{tid}/long")
    public GeneralResponse<String> updateLongTask(@PathVariable("tid") String tid, @RequestBody @Valid LongTaskForm form) {
        GeneralResponse<String> response = new GeneralResponse<>();

        TaskAbstract taskAbstract = taskService.convertTaskFormToTaskAbstract(form, "INTERVAL");
        taskAbstract.setType(tid);
        LongTask longTask = new LongTask();
        longTask.setDeadLine(form.getDeadLine());
        longTask.setSubTaskList((JSONArray) JSONArray.toJSON(form.getSubTaskList()));
        taskService.updateLongTask(taskAbstract, longTask);
        response.setMessage(taskAbstract.getTid());
        return response;
    }

    @PutMapping("/{tid}/temp")
    public GeneralResponse<String> updateTempTask(@PathVariable("tid") String tid, @RequestBody @Valid TempTaskForm form) {
        GeneralResponse<String> response = new GeneralResponse<>();

        TaskAbstract taskAbstract = taskService.convertTaskFormToTaskAbstract(form, "TEMP");
        taskAbstract.setType(tid);
        TempTask tempTask = new TempTask();
        tempTask.setDeadLine(form.getDeadLine());

        taskService.updateTempTask(taskAbstract, tempTask);
        response.setMessage(taskAbstract.getName());
        return response;
    }

    @PutMapping("/{tid}/interval")
    public GeneralResponse<String> updateIntervalTask(@PathVariable("tid") String tid, @RequestBody @Valid IntervalTaskForm form) {
        GeneralResponse<String> response = new GeneralResponse<>();

        TaskAbstract taskAbstract = taskService.convertTaskFormToTaskAbstract(form, "INTERVAL");
        taskAbstract.setType(tid);
        IntervalTask intervalTask = new IntervalTask();
        intervalTask.setCycle(form.getCycle());

        taskService.updateIntervalTask(taskAbstract, intervalTask);
        response.setMessage(taskAbstract.getName());
        return response;
    }
}
