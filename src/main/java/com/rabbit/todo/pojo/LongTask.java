package com.rabbit.todo.pojo;

import com.alibaba.fastjson.JSONArray;
import lombok.Data;

import java.util.Date;

@Data
public class LongTask implements Task {
    private String tid;
    private Date deadLine;

    private JSONArray subTaskList;
}
