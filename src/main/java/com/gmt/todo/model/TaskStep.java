package com.gmt.todo.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TaskStep {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long stepId;
    private String stepName;
    private boolean isCompleted;
	private LocalDate dateCreated;
	private LocalDate dateCompleted;
    private String createdBy;
    private long taskId;
    
    public long getStepId() {
        return stepId;
    }
    public void setStepId(long stepId) {
        this.stepId = stepId;
    }
    public String getStepName() {
        return stepName;
    }
    public void setStepName(String stepName) {
        this.stepName = stepName;
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
    public String getCreatedBy() {
        return createdBy;
    }
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    public long getTaskId() {
        return taskId;
    }
    public void setTaskId(long taskId) {
        this.taskId = taskId;
    }
    
    public TaskStep() {
    }
    
    @Override
    public String toString() {
        return "TaskStep [createdBy=" + createdBy + ", dateCompleted=" + dateCompleted + ", dateCreated=" + dateCreated
                + ", isCompleted=" + isCompleted + ", stepId=" + stepId + ", stepName=" + stepName + ", taskId="
                + taskId + "]";
    }

    
}
