package com.gmt.todo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.gmt.todo.model.TodoTask;

public interface TodoTaskRepository extends CrudRepository<TodoTask, Long> {
	
	List<TodoTask> getByListId(Long listId);
	
	List<TodoTask> getByListIdAndIsCompleted(Long listId, boolean isCompleted);
	
	List<TodoTask> getByUserIdAndIsCompletedAndIsImportant(String userName, boolean isCompleted, boolean isImportant);
	
	TodoTask getByTaskId(Long taskId);
	
	TodoTask getByTaskName(String taskName);
	
	List<TodoTask> getByUserId(String userName);

}
