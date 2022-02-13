package com.gmt.todo.model;

public class TResponse {
	private String status;
	private String error;
	private TodoTask todoTask;
	private TodoList todoList;
	private User user;

	public TodoList getTodoList() {
		return todoList;
	}

	public void setTodoList(TodoList todoList) {
		this.todoList = todoList;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public TodoTask getTodoTask() {
		return todoTask;
	}

	public void setTodoTask(TodoTask todoTask) {
		this.todoTask = todoTask;
	}

	public TResponse(String status) {
		super();
		this.status = status;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TResponse(String status, String error) {
		super();
		this.status = status;
		this.error = error;
	}

	public TResponse(String status, TodoTask todoTask) {
		super();
		this.status = status;
		this.todoTask = todoTask;
	}
	public TResponse() {

	}
	
	@Override
	public String toString() {
		return "TResponse [status=" + status + ", todoTask=" + todoTask + "]";
	}
	
}
