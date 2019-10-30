package com.rabbit.todo.DAO;

import com.rabbit.todo.POJO.TaskList;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ListDAO {
    List<TaskList> all();

    void create(TaskList list);

    void edit(@Param("lid") String lid, @Param("name") String name, @Param("rank") Integer rank);

    void deleteList(@Param("lid") String lid);
    void deleteTaskList(@Param("lid") String lid);
    void cascadeLongTask(@Param("lid") String lid);
    void cascadeIntervalTask(@Param("lid") String lid);
    void cascadeTempTask(@Param("lid") String lid);

    TaskList list(@Param("lid") String lid);
}
