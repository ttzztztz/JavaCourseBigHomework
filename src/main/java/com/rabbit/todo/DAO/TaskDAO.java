package com.rabbit.todo.DAO;

import com.rabbit.todo.POJO.IntervalTask;
import com.rabbit.todo.POJO.LongTask;
import com.rabbit.todo.POJO.TaskAbstract;
import com.rabbit.todo.POJO.TempTask;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface TaskDAO {
    String taskType(@Param("tid") String tid);

    List<TaskAbstract> list(@Param("from") Integer from, @Param("to") Integer to, @Param("lid") String lid);
    void deleteTask(@Param("tid") String tid);
    void cascadeTaskLong(@Param("tid") String tid);
    void cascadeTaskInterval(@Param("tid") String tid);
    void cascadeTaskTemp(@Param("tid") String tid);

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
