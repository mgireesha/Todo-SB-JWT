package com.gmt.todo.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.repository.TaskStepRepository;
import com.gmt.todo.repository.TodoTaskRepository;

@Service
public class TaskService {

	@Autowired
	private TodoTaskRepository todoTaskRepository;
	
	@Autowired
	private TaskStepRepository taskStepRepository;
	
	@Lazy
	@Autowired
	private ListService listService;
	
	public TodoTask getTaskByTaskId(Long taskId) {
		TodoTask task = todoTaskRepository.getByTaskId(taskId);
		task.setTaskSteps(taskStepRepository.getByTaskIdOrderByStepId(taskId));
		return task;
	}
	
	public TodoTask getTaskByTaskName(String taskName) {
		return todoTaskRepository.getByTaskName(taskName);
	}
	
	public List<TodoTask> getByListId(Long listId){
		return todoTaskRepository.getByListId(listId);
	}
	
	public Map<String, List> getTasksByListId(Long listId) {
		List<TodoTask> taskListC = null;
		List<TodoTask> taskListT = null;
		List<TodoList> todoList = new ArrayList<TodoList>();
		Map <String, List> tasksMap = new HashMap<String, List>();
		TodoList todoList2 =  listService.getListById(listId);
		todoList2.setTaskCount(Long.valueOf(todoTaskRepository.getByListId(todoList2.getListId()).size()));
		todoList.add(todoList2);
		if(!todoList.isEmpty() && null!= todoList.get(0).getListName() 
				&&  "Important".equals(todoList.get(0).getListName())) {
			taskListC = (List<TodoTask>) todoTaskRepository
					.getByUserIdAndIsCompletedAndIsImportant(todoList.get(0).getUserId(),true, true);
			taskListT = (List<TodoTask>) todoTaskRepository
					.getByUserIdAndIsCompletedAndIsImportant(todoList.get(0).getUserId(),false, true);
		}else {
			taskListC = (List<TodoTask>) todoTaskRepository.getByListIdAndIsCompleted(listId,true);
			taskListT = (List<TodoTask>) todoTaskRepository.getByListIdAndIsCompleted(listId,false);
		}
		tasksMap.put("todoList", todoList);
		tasksMap.put("taskListC", taskListC);
		tasksMap.put("taskListT", taskListT);
		return tasksMap;
	}
	
	public TodoTask addNewTask(TodoTask task) {
		TodoUserDetails userDetails = null;
		try {
			userDetails = (TodoUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		} catch (Exception e) {}
		if("Important".equals(task.getListName())) {
			task.setImportant(true);
			task.setListName("Tasks");
			TodoList listTasks = listService.getListByListNameAndUser("Tasks",userDetails.getUsername());
			task.setListId(listTasks.getListId());
		}
		if(null!=userDetails) {
			task.setUserId(userDetails.getUsername());
		}
		task.setDateCreated(LocalDate.now());
		task = todoTaskRepository.save(task);
		return task;
	}
	
	public TodoTask save(TodoTask task) {
		return todoTaskRepository.save(task);
	}
	
	public List<TodoTask> save(List<TodoTask> task) {
		return (List<TodoTask>) todoTaskRepository.saveAll(task);
	}
	
	public TodoTask updateTask(TodoTask task, Long taskId, String action) {
		TodoTask taskD = todoTaskRepository.getByTaskId(taskId);
		if(null!=action && "complete".equals(action)) {
			taskD.setCompleted(task.isCompleted());
			if(task.isCompleted()) {
				taskD.setDateCompleted(LocalDate.now());
			}else {
				taskD.setDateCompleted(null);
			}
		}
		if(null!=action && "note".equals(action)) {
			taskD.setNote(task.getNote());
		}
		if(null!=action && "uri-ref".equals(action)) {
			taskD.setUriRef(task.getUriRef());
		}
		if(null!=action && "important".equals(action)) {
			taskD.setImportant(task.isImportant());
		}
		if(null!=action && "taskName".equals(action)) {
			taskD.setTaskName(task.getTaskName());
		}
		
		if(null!=action && "remindMe".equals(action)) {
			taskD.setRemindMe(task.isRemindMe());
			taskD.setRemindTime(null);
		}
		
		if(null!=action && "remindMeDate".equals(action)) {
			taskD.setRemindMe(task.isRemindMe());
			taskD.setRemindTime(task.getRemindTime());
		}
		
		if(null!=action && "dueDate".equals(action)) {
			taskD.setDueDate(task.getDueDate());
		}
		/*
		 * if(task.isCompleted() || task.isImportant()) {
		 * taskD.setImportant(task.isImportant());
		 * taskD.setCompleted(task.isCompleted()); completedDate = LocalDate.now();
		 * taskD.setDateCompleted(completedDate); }else {
		 * taskD.setImportant(task.isImportant());
		 * taskD.setCompleted(task.isCompleted());
		 * taskD.setDateCompleted(completedDate); } if(task.getNote()!=null) {
		 * taskD.setNote(task.getNote()); } if(task.getTaskName()!=null &&
		 * !"".equals(task.getTaskName())) { taskD.setTaskName(task.getTaskName()); }
		 */
		taskD = todoTaskRepository.save(taskD);
		
		return taskD;
	}
	
	public TodoTask deleteTask(Long taskId) {
		TodoTask task = todoTaskRepository.getByTaskId(taskId);
		todoTaskRepository.deleteById(taskId);
		return task;
	}
	
	public void deleteAll(List<TodoTask> tasks) {
		todoTaskRepository.deleteAll(tasks);
	}

	public List<TodoTask> getAllTasksForUser() {
		TodoUserDetails userDetails = (TodoUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return todoTaskRepository.getByUserId(userDetails.getUsername());
	}
}
