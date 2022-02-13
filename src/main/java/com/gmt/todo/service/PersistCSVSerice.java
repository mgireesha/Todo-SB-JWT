package com.gmt.todo.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.model.User;

@Service
public class PersistCSVSerice {
	
	private static final Logger log = LoggerFactory.getLogger(PersistCSVSerice.class);
	
	@Autowired
	private ListService listService;
	
	@Autowired
	private TaskService taskService;
	
	@Autowired
	private UserService userService;
	
	//@PostConstruct
	public void processCSVData() {
		System.out.println("processCSVData");
		Resource todoList_testData = new ClassPathResource("todoList_testData.csv");
		Resource taskList_testData = new ClassPathResource("taskList_testData.csv");
		Resource userF = new ClassPathResource("user.csv");
		try (BufferedReader br = new BufferedReader(new InputStreamReader(todoList_testData.getInputStream()))){
			String line = null;
			String[] todoListArr = null;
			TodoList todoList = null;
			long groupId = listService.generateGroupId();
			while((line = br.readLine())!=null) {
				todoListArr = line.split(",");
				//todoList = new TodoList(Long.parseLong(todoListArr[0]), todoListArr[1], todoListArr[2]);
				todoList = new TodoList(todoListArr[0], todoListArr[1], LocalDate.parse(todoListArr[2]),groupId,todoListArr[3]);
				if(null!=todoList)
					todoList =listService.save(todoList);
				System.out.println(todoList);
			}
			
		}catch(IOException ioe) {
			log.error(ioe.getMessage());
			log.error(Arrays.toString(ioe.getStackTrace()));
		}
		
		try (BufferedReader br = new BufferedReader(new InputStreamReader(taskList_testData.getInputStream()))){
			String line = null;
			String[] taskListArr = null;
			TodoTask todoTasK = null;
			line = br.readLine();//To skip first line
			LocalDate dateCompleted = null;
			LocalDate dueDate = null;
			while((line = br.readLine())!=null) {
				taskListArr = line.split(",");
				//todoTasK = new TodoTask(Long.parseLong(taskListArr[0]), taskListArr[2], taskListArr[3], Boolean.parseBoolean(taskListArr[4]), taskListArr[5],Long.parseLong(taskListArr[1]),taskListArr[6]);
				if(null!=taskListArr[6] && !"".equals(taskListArr[6])) {
					dateCompleted = LocalDate.parse(taskListArr[6]);
				}
				if(null!=taskListArr[7] && !"".equals(taskListArr[7])) {
					dueDate = LocalDate.parse(taskListArr[7]);
				}
				todoTasK = new TodoTask( taskListArr[0],  taskListArr[1],  Boolean.parseBoolean(taskListArr[2]),  taskListArr[3],
						 Boolean.parseBoolean(taskListArr[4]),  LocalDate.parse(taskListArr[5]),  dateCompleted,  dueDate, Boolean.parseBoolean(taskListArr[8]), Long.parseLong(taskListArr[9]),  taskListArr[10]);
				//System.out.println(todoTasK);
				if(null!=todoTasK) {
					taskService.save(todoTasK);
					//System.out.println(todoTaskRepository.findAll());
				}
					
				
			}
			
			
		}catch(IOException ioe) {
			log.error(ioe.getMessage());
			log.error(Arrays.toString(ioe.getStackTrace()));
		}
		
		try (BufferedReader br = new BufferedReader(new InputStreamReader(userF.getInputStream()))){
			String line = null;
			String[] userArr = null;
			User user = null;
			while((line = br.readLine())!=null) {
				userArr = line.split(",");
				String[] rolesArr = userArr[3].split(">>");
				String roles="";
				for(int i=0;i<rolesArr.length;i++) {
					roles+=rolesArr[i];
					if(i<rolesArr.length-1)
						roles+=",";
				}
				System.out.println(roles);
				user = new User(userArr[0], userArr[1], Boolean.parseBoolean(userArr[2]),roles);
				if(null!=user)
					userService.save(user);
			}
			
		}catch(IOException ioe) {
			log.error(ioe.getMessage());
			log.error(Arrays.toString(ioe.getStackTrace()));
		}
	}
	
	public List<TodoList> addNewDefaultList() {
		TodoList todoList = null;
		List<TodoList> tList = new ArrayList<TodoList>();
		List<User> userList = userService.getAllUsers();
		for (User user : userList) {
			todoList = new TodoList();
			todoList.setDateCreated(LocalDate.now());
			todoList.setGroupId(listService.generateGroupId());
			todoList.setGroupName("default");
			todoList.setListName("Important");
			todoList.setUserId(user.getUserName());
			tList.add(todoList);
		}
		return listService.save(tList);
	}
	
	public List<TodoTask> updateUserIdToTasks() {
		List<User> userList = userService.getAllUsers();
		List<TodoList> tList = new ArrayList<TodoList>();
		List<TodoTask> taskList = new ArrayList<TodoTask>();
		List<TodoTask> taskListRet = new ArrayList<TodoTask>();
		for (User user : userList) {
			tList = listService.getListByUserId(user.getUserName());
			for (TodoList todoList : tList) {
				taskList = taskService.getByListId(todoList.getListId());
				for (TodoTask todoTask : taskList) {
					todoTask.setUserId(user.getUserName());
					taskListRet.add(todoTask);
				}
			}
		}
		taskService.save(taskListRet);
		return taskListRet;
	}
	
	public List<TodoList> updateGroupId(){
		List<User> userList = userService.getAllUsers();
		List<TodoList> tList = new ArrayList<TodoList>();
		List<TodoList> tListRet = new ArrayList<TodoList>();
		for (User user : userList) {
			tList = listService.getListByUserId(user.getUserName());
			for (TodoList todoList : tList) {
				if("common".equalsIgnoreCase(todoList.getGroupName())) {
					todoList.setGroupId(2001);
				}else if("default".equalsIgnoreCase(todoList.getGroupName())) {
					todoList.setGroupId(1001);
				}
				tListRet.add(todoList);
			}
		}
		listService.save(tListRet);
		return tListRet;
	}
	
}
