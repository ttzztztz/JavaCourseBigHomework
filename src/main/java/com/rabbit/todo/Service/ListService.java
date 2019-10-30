package com.rabbit.todo.Service;

import com.rabbit.todo.DAO.ListDAO;
import com.rabbit.todo.POJO.TaskList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListService {
    private ListDAO listDAO;

    @Value("${rabbit.page.size}")
    private Integer PAGESIZE;

    @Autowired
    public ListService(ListDAO listDAO) {
        this.listDAO = listDAO;
    }

    public List<TaskList> list(Integer page) {
        return listDAO.list((page - 1) * PAGESIZE, page * PAGESIZE);
    }
}
