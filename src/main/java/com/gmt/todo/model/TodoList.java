package com.gmt.todo.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
public class TodoList {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long listId;
	private String listName;
	private String userId;
	private LocalDate dateCreated;
	private long groupId;
	private String groupName;
	@Transient
	private List<TodoTask> taskList;
	@Transient
	private Long taskCount;
	public long getListId() {
		return listId;
	}
	public void setListId(long listId) {
		this.listId = listId;
	}
	public String getListName() {
		return listName;
	}
	public void setListName(String listName) {
		this.listName = listName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String unserId) {
		this.userId = unserId;
	}
	public List<TodoTask> getTaskList() {
		return taskList;
	}
	public void setTaskList(List<TodoTask> taskList) {
		this.taskList = taskList;
	}
	
	public LocalDate getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(LocalDate dateCreated) {
		this.dateCreated = dateCreated;
	}
	
	public long getGroupId() {
		return groupId;
	}
	public void setGroupId(long groupId) {
		this.groupId = groupId;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public Long getTaskCount() {
		return taskCount;
	}
	public void setTaskCount(Long taskCount) {
		this.taskCount = taskCount;
	}
	public TodoList(long listId, String listName, String userId, List<TodoTask> taskList) {
		this.listId = listId;
		this.listName = listName;
		this.userId = userId;
		this.taskList = taskList;
	}
	
	public TodoList(long listId, String listName, String userId) {
		this.listId = listId;
		this.listName = listName;
		this.userId = userId;
	}
	
	public TodoList(String listName, String userId) {
		this.listName = listName;
		this.userId = userId;
	}
	
	public TodoList(String listName, String userId, LocalDate dateCreated) {
		this.listName = listName;
		this.userId = userId;
		this.dateCreated = dateCreated;
	}
	
	public TodoList(String listName, String userId, LocalDate dateCreated, Long groupId, String groupName) {
		this.listName = listName;
		this.userId = userId;
		this.dateCreated = dateCreated;
		this.groupId = groupId;
		this.groupName = groupName;
	}
	public TodoList() {
		
	}
	@Override
	public String toString() {
		return "TodoList [listId=" + listId + ", listName=" + listName + ", userId=" + userId + ", dateCreated="
				+ dateCreated + ", groupId=" + groupId + ", groupName=" + groupName + ", taskList=" + taskList + "]";
	}
	
	
}
