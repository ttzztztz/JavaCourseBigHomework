package com.rabbit.todo.DAO;

import com.rabbit.todo.POJO.TaskList;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ListDAO {
    List<TaskList> list(@Param("from") Integer from, @Param("to") Integer to);
}
