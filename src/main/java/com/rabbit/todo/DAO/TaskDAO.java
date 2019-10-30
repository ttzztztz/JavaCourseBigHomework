package com.rabbit.todo.DAO;

import com.rabbit.todo.POJO.IntervalTask;
import com.rabbit.todo.POJO.LongTask;
import com.rabbit.todo.POJO.TaskAbstract;
import com.rabbit.todo.POJO.TempTask;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface TaskDAO {
    void deleteTask(@Param("tid") String tid);
    void deleteTaskByList(@Param("lid") String lid);
    void deleteTaskLong(@Param("tid") String tid);
    void deleteTaskInterval(@Param("tid") String tid);
    void deleteTaskTemp(@Param("tid") String tid);

    TaskAbstract task(@Param("tid") String tid);
    LongTask longTask(@Param("tid") String tid);
    TempTask tempTask(@Param("tid") String tid);
    IntervalTask intervalTask(@Param("tid") String tid);

    void insertTask(TaskAbstract taskAbstract);
    void insertLongTask(LongTask longTask);
    void insertTempTask(TempTask tempTask);
    void insertIntervalTask(IntervalTask intervalTask);

    void updateTask(TaskAbstract taskAbstract);
    void updateLongTask(LongTask longTask);
    void updateTempTask(TempTask tempTask);
    void updateIntervalTask(IntervalTask intervalTask);
}
