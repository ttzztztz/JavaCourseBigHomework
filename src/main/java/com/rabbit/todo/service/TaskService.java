package com.rabbit.todo.service;

import com.rabbit.todo.dao.ListDAO;
import com.rabbit.todo.dao.TaskDAO;
import com.rabbit.todo.exception.InvalidTypeException;
import com.rabbit.todo.pojo.*;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskService {
    @Value("${rabbit.page.size}")
    private Integer PAGESIZE;

    private TaskDAO taskDAO;
    private ListDAO listDAO;

    @Autowired
    public TaskService(TaskDAO taskDAO, ListDAO listDAO) {
        this.taskDAO = taskDAO;
        this.listDAO = listDAO;
    }

    public List<TaskAbstract> list(Integer page, String lid) {
        return taskDAO.list((page - 1) * PAGESIZE, page * PAGESIZE, lid);
    }

    public List<TaskAbstract> list(Integer page) {
        return taskDAO.list((page - 1) * PAGESIZE, page * PAGESIZE, "all");
    }

    public TaskResponse taskResponse(String tid) throws InvalidTypeException {
        TaskAbstract taskAbstract = taskDAO.task(tid);
        TaskResponse<Task> response = new TaskResponse<>();
        response.setInfo(taskAbstract);
        switch (taskAbstract.getType()) {
            case "LONG":
                response.setDetail(taskDAO.longTask(tid));
                break;
            case "TEMP":
                response.setDetail(taskDAO.tempTask(tid));
                break;
            case "INTERVAL":
                response.setDetail(taskDAO.intervalTask(tid));
                break;
            default:
                throw new InvalidTypeException(taskAbstract.getType());
        }
        return response;
    }

    @Transactional
    public void delete(String tid) throws InvalidTypeException {
        TaskAbstract taskAbstract = taskDAO.task(tid);
        switch (taskAbstract.getType()) {
            case "LONG":
                taskDAO.cascadeTaskLong(tid);
                break;
            case "TEMP":
                taskDAO.cascadeTaskTemp(tid);
                break;
            case "INTERVAL":
                taskDAO.cascadeTaskInterval(tid);
                break;
            default:
                throw new InvalidTypeException(taskAbstract.getType());
        }

        taskDAO.deleteTask(tid);
    }

    public TaskAbstract task(String tid) {
        return taskDAO.task(tid);
    }

    private void updateTask(TaskAbstract taskAbstract) {
        taskDAO.updateTask(taskAbstract);
    }

    @Transactional
    public void updateLongTask(TaskAbstract taskAbstract, LongTask longTask) {
        String type = taskDAO.taskType(longTask.getTid());
        if (!type.equals("LONG")) {
            throw new InvalidTypeException(type);
        }
        updateTask(taskAbstract);
        longTask.setTid(taskAbstract.getTid());
        taskDAO.updateLongTask(longTask);
    }

    @Transactional
    public void updateTempTask(TaskAbstract taskAbstract, TempTask tempTask) {
        String type = taskDAO.taskType(tempTask.getTid());
        if (!type.equals("TEMP")) {
            throw new InvalidTypeException(type);
        }
        updateTask(taskAbstract);
        tempTask.setTid(taskAbstract.getTid());
        taskDAO.updateTempTask(tempTask);
    }

    @Transactional
    public void updateIntervalTask(TaskAbstract taskAbstract, IntervalTask intervalTask) {
        String type = taskDAO.taskType(intervalTask.getTid());
        if (!type.equals("INTERVAL")) {
            throw new InvalidTypeException(type);
        }
        updateTask(taskAbstract);
        intervalTask.setTid(taskAbstract.getTid());
        taskDAO.updateIntervalTask(intervalTask);
    }

    private void insertTask(TaskAbstract taskAbstract) throws NotFoundException {
        TaskList taskList = listDAO.list(taskAbstract.getLid());
        if (taskList == null) {
            throw new NotFoundException("target list not found!");
        }
        taskDAO.insertTask(taskAbstract);
    }

    @Transactional
    public void insertLongTask(TaskAbstract taskAbstract, LongTask longTask) throws NotFoundException {
        insertTask(taskAbstract);
        longTask.setTid(taskAbstract.getTid());
        taskDAO.insertLongTask(longTask);
    }

    @Transactional
    public void insertTempTask(TaskAbstract taskAbstract, TempTask tempTask) throws NotFoundException {
        insertTask(taskAbstract);
        tempTask.setTid(taskAbstract.getTid());
        taskDAO.insertTempTask(tempTask);
    }

    @Transactional
    public void insertIntervalTask(TaskAbstract taskAbstract, IntervalTask intervalTask) throws NotFoundException {
        insertTask(taskAbstract);
        intervalTask.setTid(taskAbstract.getTid());
        taskDAO.insertIntervalTask(intervalTask);
    }

    public TaskAbstract convertTaskFormToTaskAbstract(TaskForm form, String type) {
        TaskAbstract taskAbstract = new TaskAbstract();
        taskAbstract.setName(form.getName());
        taskAbstract.setLid(form.getLid());
        taskAbstract.setDescription(form.getDescription());
        taskAbstract.setType(type);
        taskAbstract.setRank(form.getRank());
        taskAbstract.setStatus(0);
        return taskAbstract;
    }
}
