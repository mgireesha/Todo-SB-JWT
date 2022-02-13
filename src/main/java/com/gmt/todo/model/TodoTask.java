package com.gmt.todo.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TodoTask {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long taskId;
	@Column(length = 10000)
	private String taskName;
	private String taskDescription;
	private boolean remindMe;
	private LocalDateTime remindTime;
	private String note;
	private boolean isCompleted;
	private LocalDate dateCreated;
	private LocalDate dateCompleted;
	private LocalDate dueDate;
	private boolean isRepeat;
	@Column(nullable=false, columnDefinition = "BOOLEAN DEFAULT FALSE")
	private boolean isImportant;
	private String userId;
	private long listId;
	private String listName;
	private String uriRef;
	
	public String getUriRef() {
		return uriRef;
	}
	public void setUriRef(String uriRef) {
		this.uriRef = uriRef;
	}
	public long getListId() {
		return listId;
	}
	public void setListId(long listId) {
		this.listId = listId;
	}
	public long getTaskId() {
		return taskId;
	}
	public void setTaskId(long taskId) {
		this.taskId = taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getTaskDescription() {
		return taskDescription;
	}
	public void setTaskDescription(String taskDescription) {
		this.taskDescription = taskDescription;
	}
	public boolean isRemindMe() {
		return remindMe;
	}
	public void setRemindMe(boolean remindMe) {
		this.remindMe = remindMe;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
	public String getListName() {
		return listName;
	}
	public void setListName(String listName) {
		this.listName = listName;
	}
	
	public boolean isCompleted() {
		return isCompleted;
	}
	public void setCompleted(boolean isCompleted) {
		this.isCompleted = isCompleted;
	}
	public LocalDate getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(LocalDate dateCreated) {
		this.dateCreated = dateCreated;
	}
	public LocalDate getDateCompleted() {
		return dateCompleted;
	}
	public void setDateCompleted(LocalDate dateCompleted) {
		this.dateCompleted = dateCompleted;
	}
	
	public LocalDate getDueDate() {
		return dueDate;
	}
	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}
	public boolean isRepeat() {
		return isRepeat;
	}
	public void setRepeat(boolean isRepeat) {
		this.isRepeat = isRepeat;
	}
	public boolean isImportant() {
		return isImportant;
	}
	public void setImportant(boolean isImportant) {
		this.isImportant = isImportant;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public LocalDateTime getRemindTime() {
		return remindTime;
	}
	public void setRemindTime(LocalDateTime remindTime) {
		this.remindTime = remindTime;
	}
	public TodoTask(long taskId, String taskName, String taskDescription, boolean remindMe, String note, long listId, String listName) {
		super();
		this.taskId = taskId;
		this.taskName = taskName;
		this.taskDescription = taskDescription;
		this.remindMe = remindMe;
		this.note = note;
		this.listId = listId;
		this.listName = listName;
	}
	
	public TodoTask(String taskName, String taskDescription, boolean remindMe, String note, long listId, String listName) {
		super();
		this.taskName = taskName;
		this.taskDescription = taskDescription;
		this.remindMe = remindMe;
		this.note = note;
		this.listId = listId;
		this.listName = listName;
	}
	
	public TodoTask(String taskName, String taskDescription, boolean remindMe, String note,
			boolean isCompleted, LocalDate dateCreated, LocalDate dateCompleted, long listId, String listName) {
		super();
		this.taskName = taskName;
		this.taskDescription = taskDescription;
		this.remindMe = remindMe;
		this.note = note;
		this.isCompleted = isCompleted;
		this.dateCreated = dateCreated;
		this.dateCompleted = dateCompleted;
		this.listId = listId;
		this.listName = listName;
	}
	
	
	public TodoTask(String taskName, String taskDescription, boolean remindMe, String note, boolean isCompleted,
			LocalDate dateCreated, LocalDate dateCompleted, LocalDate dueDate, boolean isRepeat, long listId,
			String listName) {
		super();
		this.taskName = taskName;
		this.taskDescription = taskDescription;
		this.remindMe = remindMe;
		this.note = note;
		this.isCompleted = isCompleted;
		this.dateCreated = dateCreated;
		this.dateCompleted = dateCompleted;
		this.dueDate = dueDate;
		this.isRepeat = isRepeat;
		this.listId = listId;
		this.listName = listName;
	}
	
	public TodoTask() {
		
	}
	@Override
	public String toString() {
		return "TodoTask [taskId=" + taskId + ", taskName=" + taskName + ", taskDescription=" + taskDescription
				+ ", remindMe=" + remindMe + ", remindTime=" + remindTime + ", note=" + note + ", isCompleted="
				+ isCompleted + ", dateCreated=" + dateCreated + ", dateCompleted=" + dateCompleted + ", dueDate="
				+ dueDate + ", isRepeat=" + isRepeat + ", isImportant=" + isImportant + ", userId=" + userId
				+ ", listId=" + listId + ", listName=" + listName + ", uriRef=" + uriRef + "]";
	}
	
	

}
