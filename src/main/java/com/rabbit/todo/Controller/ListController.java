package com.rabbit.todo.Controller;

import com.rabbit.todo.POJO.GeneralResponse;
import com.rabbit.todo.POJO.TaskList;
import com.rabbit.todo.Service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/list")
@RestController
public class ListController {
    private ListService listService;

    @Autowired
    public ListController(ListService listService) {
        this.listService = listService;
    }

    @GetMapping("/{page}")
    public GeneralResponse<List<TaskList>> list(@PathVariable("page") Integer page) {
        GeneralResponse<List<TaskList>> response = new GeneralResponse<>();

        response.setCode(200);
        response.setMessage(listService.list(page));

        return response;
    }
}
