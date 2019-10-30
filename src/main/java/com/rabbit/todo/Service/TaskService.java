package com.rabbit.todo.Service;

import com.rabbit.todo.DAO.TaskDAO;
import com.rabbit.todo.POJO.TaskAbstract;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Value("${rabbit.page.size}")
    private Integer PAGESIZE;

    private TaskDAO taskDAO;

    @Autowired
    public TaskService(TaskDAO taskDAO) {
        this.taskDAO = taskDAO;
    }

    public List<TaskAbstract> list(Integer page, String lid) {
        return taskDAO.list((page - 1) * PAGESIZE, page * PAGESIZE, lid);
    }

    public List<TaskAbstract> list(Integer page) {
        return taskDAO.list((page - 1) * PAGESIZE, page * PAGESIZE, "all");
    }
}
