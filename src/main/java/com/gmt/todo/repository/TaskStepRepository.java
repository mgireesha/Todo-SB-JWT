package com.gmt.todo.repository;

import java.util.List;

import com.gmt.todo.model.TaskStep;

import org.springframework.data.repository.CrudRepository;

public interface TaskStepRepository extends CrudRepository<TaskStep, Long>{
    List<TaskStep> getByTaskId(long taskId);
    List<TaskStep> getByTaskIdOrderByStepId(long taskId);
    TaskStep getByStepId(long stepId);
}
