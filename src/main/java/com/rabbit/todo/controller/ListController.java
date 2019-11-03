package com.rabbit.todo.controller;

import com.rabbit.todo.pojo.GeneralResponse;
import com.rabbit.todo.pojo.ListForm;
import com.rabbit.todo.pojo.TaskList;
import com.rabbit.todo.service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/list")
@RestController
public class ListController {
    private ListService listService;

    @Autowired
    public ListController(ListService listService) {
        this.listService = listService;
    }

    @GetMapping("/{lid}")
    public GeneralResponse<TaskList> info(@PathVariable("lid") String lid) {
        GeneralResponse<TaskList> response = new GeneralResponse<>();
        response.setMessage(listService.info(lid));
        return response;
    }

    @GetMapping("/")
    public GeneralResponse<List<TaskList>> list() {
        GeneralResponse<List<TaskList>> response = new GeneralResponse<>();
        response.setMessage(listService.all());
        return response;
    }

    @DeleteMapping("/{lid}")
    public GeneralResponse<Integer> delete(@PathVariable("lid") String lid) {
        GeneralResponse<Integer> response = new GeneralResponse<>();
        listService.cascadeDelete(lid);
        return response;
    }

    @PostMapping("/create")
    public GeneralResponse<String> create(@RequestBody @Valid ListForm form) {
        GeneralResponse<String> response = new GeneralResponse<>();

        TaskList taskList = new TaskList();
        taskList.setName(form.getName());
        taskList.setRank(form.getRank());
        listService.create(taskList);

        response.setMessage(taskList.getLid());
        return response;
    }

    @PostMapping("/{lid}")
    public GeneralResponse<String> update(@RequestBody @Valid ListForm form, @PathVariable("lid") String lid) {
        GeneralResponse<String> response = new GeneralResponse<>();

        TaskList taskList = new TaskList();
        taskList.setName(form.getName());
        taskList.setRank(form.getRank());
        taskList.setLid(lid);
        listService.update(taskList);

        response.setMessage(taskList.getLid());
        return response;
    }


}
