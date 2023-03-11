package com.gmt.todo.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.model.User;
import com.gmt.todo.repository.TodolistRepository;

@Service
public class ListService {

	@Autowired
	private TaskService taskService;

	@Autowired
	private TodolistRepository todolistRepository;

	public List<TodoList> getAllLists() {
		// System.out.println(todolistRepository.getByUserIdByOrderByGroupId("aditya"));
		return (List<TodoList>) todolistRepository.findAll();
	}

	public TodoList getListById(Long listId) {
		return todolistRepository.getByListId(listId);
	}

	public TodoList getListByListNameAndUser(String listName, String userName) {
		return todolistRepository.getByListNameAndUserId(listName, userName);
	}

	public TodoList addNewList(TodoList todoList, TodoUserDetails userDetails) {
		todoList.setDateCreated(LocalDate.now());
		todoList.setUserId(userDetails.getUsername());
		if (null == todoList.getGroupName() || "".equals(todoList.getGroupName())) {
			todoList.setGroupId(2001);
			todoList.setGroupName("common");
		}
		todoList = todolistRepository.save(todoList);
		return todoList;
	}

	public TodoList save(TodoList todoList) {
		return todolistRepository.save(todoList);
	}

	public List<TodoList> save(List<TodoList> todoList) {
		return (List<TodoList>) todolistRepository.saveAll(todoList);
	}

	public TodoList updateList(TodoList list, Long listId) {
		// TodoList listD = todolistRepository.getByListId(listId);
		// listD.setListName(list.getListName());
		// listD = todolistRepository.save(listD);
		TodoList listD = todolistRepository.save(list);
		return listD;
	}

	public void deleteList(Long listId) {
		List<TodoTask> taskList = taskService.getByListId(listId);
		todolistRepository.deleteById(listId);
		taskService.deleteAll(taskList);
	}

	public void deleteListsOfUser(User user) {
		List<TodoList> userList = todolistRepository.getByUserIdOrderByListId(user.getUserName());
		List<TodoTask> usertaks = new ArrayList<TodoTask>();
		for (TodoList tList : userList) {
			usertaks.addAll(taskService.getByListId(tList.getListId()));
		}
		todolistRepository.deleteAll(userList);
		taskService.deleteAll(usertaks);
	}

	public Long generateGroupId() {
		return todolistRepository.getMaxId() + 1;
	}

	public Map<String, List<TodoList>> getGroupedListByUserId(String userName) {
		Map<String, List<TodoList>> listRet = new HashMap<String, List<TodoList>>();
		List<String> groups = todolistRepository.getByUserIdGroupByGroupName(userName);
		for (String group : groups) {
			listRet.put(group, todolistRepository.getByUserIdAndGroupNameOrderByDateCreated(userName, group));
		}
		for (Entry<String, List<TodoList>> entry : listRet.entrySet()) {
			for (TodoList todoList : entry.getValue()) {
				if (!"Important".equals(todoList.getListName())) {
					todoList.setTaskCount(Long.valueOf(taskService.getByListId(todoList.getListId()).size()));
				} else {
					Map<String, List> tasks = taskService.getTasksByListId(todoList.getListId());
					todoList.setTaskCount(Long.valueOf(tasks.get("taskListC").size() + tasks.get("taskListT").size()));
				}

			}
		}
		return listRet;
	}

	public List<TodoList> getListByUserId(String userId) {
		return todolistRepository.getByUserIdOrderByListId(userId);
	}

	public TodoList archiveList(Long listId) {
		TodoList todoList = getListById(listId);
		if (todoList.getGroupName().equals("archived")) {
			todoList.setGroupName("common");
			todoList.setGroupId(2001);
		} else {
			todoList.setGroupName("archived");
			todoList.setGroupId(3001);
		}
		todoList.setTaskCount(Long.valueOf(taskService.getByListId(todoList.getListId()).size()));
		todoList = save(todoList);
		return todoList;
	}
}
