package com.gmt.todo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.TaskStep;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.repository.TaskStepRepository;
import com.gmt.todo.service.ListService;
import com.gmt.todo.service.TaskService;
import com.gmt.todo.service.TaskStepService;

@RestController
@CrossOrigin 
@RequestMapping("/todo")
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private TaskStepService taskStepService;
	
	@Autowired
	private ListService listService;

	@Autowired
	private TaskStepRepository taskStepRepository;
	
	@RequestMapping(method = RequestMethod.POST, value = "/task/")
	public TResponse addNewTask(@RequestBody TodoTask task) {
		TResponse resp = new TResponse();
		try {
			task = taskService.addNewTask(task);
			resp.setStatus("success");
			resp.setTodoTask(task);
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/task/{taskId}/")
	public TodoTask getTaskByTaskId(@PathVariable String taskId) {
		return taskService.getTaskByTaskId(Long.parseLong(taskId));
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/task/{taskId}/{action}")
	public TResponse updateTask(@RequestBody TodoTask task,@PathVariable String taskId, @PathVariable String action) {
		TResponse resp = new TResponse();
		try {
			task = taskService.updateTask(task, Long.parseLong(taskId), action);
			task.setTaskSteps(taskStepService.getTaskStepsByTaskId(task.getTaskId()));
			resp.setStatus("success");
			resp.setTodoTask(task);
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/task/{taskId}")
	public TResponse deleteTask(@PathVariable String taskId) {
		TResponse resp = new TResponse();
		try {
			TodoTask task = taskService.deleteTask(Long.parseLong(taskId));
			resp.setTodoTask(task);
			resp.setStatus("success");
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.GET, value = "task/getTasksByListId/{listId}")
	public Map<String, List> getTodoTasksByListId(@PathVariable String listId) {
		Map<String, List> tasksMap = taskService.getTasksByListId(Long.parseLong(listId));
		Long before = System.currentTimeMillis();
		for (Map.Entry<String, List> lists : tasksMap.entrySet()) {
			if(!lists.getKey().equals("todoList")) {
				for(TodoTask task : (List<TodoTask>)lists.getValue()) {
					task.setTaskSteps(taskStepService.getTaskStepsByTaskId(task.getTaskId()));
				}
			}
		}
		Long after = System.currentTimeMillis();
		System.out.println("Time taken: "+(after-before));
		return tasksMap;
	}
	
	@RequestMapping("task/getUserTasks")
	public List<TodoTask> getAllTasksForUser(){
		return taskService.getAllTasksForUser();
	}
	
	@RequestMapping("/task/getListsOfUsers/{taskId}")
	public List<TodoList> getListsOfUser(@PathVariable String taskId){
		TodoTask task = taskService.getTaskByTaskId(Long.parseLong(taskId));
		return listService.getListByUserId(task.getUserId());
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/task/moveTask/{taskId}/{listId}")
	public TResponse moveTask(@PathVariable String taskId, @PathVariable String listId) {
		TResponse resp = new TResponse();
		try {
			TodoTask task =  taskService.getTaskByTaskId(Long.parseLong(taskId));
			TodoList todoList = listService.getListById(Long.parseLong(listId));
			task.setListId(todoList.getListId());
			task.setListName(todoList.getListName());
			taskService.save(task);
			resp.setStatus("success");
			resp.setTodoTask(task);
			resp.setTodoList(todoList);
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/task/{taskId}/taskStep/")
	public TResponse addTaskStep(@PathVariable String taskId, @RequestBody TaskStep taskStep){
		TResponse resp = new TResponse();
		try {
			TodoTask task = taskService.getTaskByTaskId(Long.parseLong(taskId));
			if(taskStep.getTaskId()==0){
				taskStep.setTaskId(Long.parseLong(taskId));
			}
			taskStep = taskStepService.addNewStep(taskStep);
			resp.setTodoTask(taskService.getTaskByTaskId(task.getTaskId()));
			resp.setStatus("success");
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/task/{taskId}/taskStep/")
	public List<TaskStep> getTaskStepByTaskId(@PathVariable String taskId){
		return taskStepService.getTaskStepsByTaskId(Long.parseLong(taskId));
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/task/taskStep/{stepAction}/")
	public TResponse updateTaskStep(@PathVariable String stepAction, @RequestBody TaskStep taskStep) {
		TResponse resp = new TResponse();
		try {
			taskStep = taskStepService.updateStep(taskStep,stepAction);
			System.out.println("taskStep :"+taskStep);
			resp.setTodoTask(taskService.getTaskByTaskId(taskStep.getTaskId()));
			resp.setStatus("success");
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/task/taskStep/{stepId}")
	public TResponse deleteTaskStepById(@PathVariable String stepId) {
		TResponse resp = new TResponse();
		try {
			TaskStep taskStep = taskStepService.deleteStepById(Long.parseLong(stepId));
			resp.setTodoTask(taskService.getTaskByTaskId(taskStep.getTaskId()));
			resp.setStatus("success");
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}
}
