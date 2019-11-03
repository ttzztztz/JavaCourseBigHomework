package com.rabbit.todo.service;

import com.rabbit.todo.dao.ListDAO;
import com.rabbit.todo.pojo.TaskList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ListService {
    private ListDAO listDAO;

    @Autowired
    public ListService(ListDAO listDAO) {
        this.listDAO = listDAO;
    }

    public List<TaskList> all() {
        return listDAO.all();
    }

    public void create(TaskList list) {
        listDAO.create(list);
    }

    @Transactional
    public void cascadeDelete(String lid) {
        listDAO.cascadeIntervalTask(lid);
        listDAO.cascadeLongTask(lid);
        listDAO.cascadeTempTask(lid);
        listDAO.deleteList(lid);
        listDAO.deleteTaskList(lid);
    }

    public void update(TaskList list) {
        listDAO.edit(list.getLid(), list.getName(), list.getRank());
    }

    public TaskList info(String lid) {
        return listDAO.info(lid);
    }
}
