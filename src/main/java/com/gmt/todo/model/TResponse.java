package com.gmt.todo.model;

import java.util.Map;

public class TResponse {
	private String status;
	private String error;
	private TodoTask todoTask;
	private TodoList todoList;
	private User user;
	private TodoMessage message;
	private Map<String, String> KVResponse;

	public Map<String, String> getKVResponse() {
		return KVResponse;
	}

	public void setKVResponse(Map<String, String> kVResponse) {
		KVResponse = kVResponse;
	}

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
		return "TResponse [status=" + status + ", error=" + error + ", todoTask=" + todoTask + ", todoList=" + todoList
				+ ", user=" + user + ", message=" + message + ", KVResponse=" + KVResponse + "]";
	}

	public TodoMessage getMessage() {
		return message;
	}

	public void setMessage(TodoMessage message) {
		this.message = message;
	}

}
