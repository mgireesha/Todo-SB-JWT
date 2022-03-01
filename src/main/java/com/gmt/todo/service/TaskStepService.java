package com.gmt.todo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.gmt.todo.model.TaskStep;
import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.repository.TaskStepRepository;

@Service
public class TaskStepService {
	
	@Autowired
	private TaskStepRepository taskStepRepository;
	
	public List<TaskStep> getTaskStepsByTaskId(Long taskId){
		return taskStepRepository.getByTaskId(taskId);
	}

	public TaskStep addNewStep(TaskStep taskStep) {
		TodoUserDetails userDetails = null;
		try {
			userDetails = (TodoUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		} catch (Exception e) {}
		taskStep.setCreatedBy(userDetails.getUsername());
		taskStep.setDateCreated(LocalDate.now());
		return taskStepRepository.save(taskStep);
	}

	public TaskStep deleteStepById(long stepId) {
		TaskStep taskStep = taskStepRepository.getByStepId(stepId);
		taskStepRepository.deleteById(stepId);
		return taskStep;
	}

	public TaskStep updateStep(TaskStep taskStep, String stepAction) {
		TaskStep taskStepD = taskStepRepository.getByStepId(taskStep.getStepId());
		if("complete".equalsIgnoreCase(stepAction)) {
			taskStepD.setCompleted(taskStep.isCompleted());
		}
		if("stepName".equalsIgnoreCase(stepAction)) {
			taskStepD.setStepName(taskStep.getStepName());
		}
		return taskStepRepository.save(taskStepD);
	}
}
