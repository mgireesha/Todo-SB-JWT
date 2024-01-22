package com.gmt.todo.service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.TaskStep;
import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoMessage;
import com.gmt.todo.model.TodoRoleMapping;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.model.User;
import com.gmt.todo.repository.UserRepository;
import com.gmt.todo.utils.TODO_CONSTANTS;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Lazy
	@Autowired
	private ListService listService;

	@Lazy
	@Autowired
	private TaskService taskService;

	@Lazy
	@Autowired
	private TaskStepService taskStepService;

	@Autowired
	private TodoMessageService todoMessageService;

	@Autowired
	private TodoRoleMappingService roleMappingService;

	@Lazy
	@Autowired
	private TodoUserDetailsService todoUserDetailsService;

	public List<User> getAllUsers() {
		return (List<User>) userRepository.findAll();
	}

	public Optional<User> getUserByUserName(String username) {
		return userRepository.findByUserName(username);
	}

	public User getByUserName(String userName) {
		return userRepository.getByUserName(userName);
	}

	public String getUserListOrder(String userName) {
		return userRepository.getUserListOrder(userName);
	}

	public User save(User user) {
		return userRepository.save(user);
	}

	@SuppressWarnings("unchecked")
	public TResponse deleteUser(Long userId) {
		TResponse resp = new TResponse();
		try {
			User user = getUserById(userId);
			UserDetails userDetails = (TodoUserDetails) todoUserDetailsService.loadUserByUsername(user.getUserName());
			String userType = getUserTypeFromAuthorities((List<GrantedAuthority>) userDetails.getAuthorities());
			if (userType.equals(TODO_CONSTANTS.ADMIN_USER)) {
				resp.setStatus(TODO_CONSTANTS.FAILED);
				resp.setError("Admin user cannot be deleted using this functionality.");
				return resp;
			}
			listService.deleteListsOfUser(userRepository.findById(userId).map(User::new).get());
			userRepository.deleteById(userId);
			resp.setStatus(TODO_CONSTANTS.SUCCESS);
		} catch (Exception e) {
			resp.setStatus(TODO_CONSTANTS.FAILED);
			resp.setError(e.getMessage());
			e.printStackTrace();
		}
		return resp;
	}

	public User resgisterUser(User user) {
		user.setRoles("ROLE_USER");
		user.setActive(true);
		user = userRepository.save(user);
		TodoList todoList = new TodoList("Tasks", user.getUserName(), LocalDate.now(), listService.generateGroupId(),
				"default");
		TodoList imp = new TodoList("Important", user.getUserName(), LocalDate.now(), listService.generateGroupId(),
				"default");
		imp = listService.addNewList(imp, new TodoUserDetails(user));
		todoList = listService.addNewList(todoList, new TodoUserDetails(user));
		TodoTask todoTask = new TodoTask("Get up early!", "", false, "Go to work", todoList.getListId(),
				todoList.getListName());
		todoTask.setUserId(user.getUserName());
		todoTask.setImportant(true);
		taskService.addNewTask(todoTask);
		return user;
	}

	public JSONObject initiateRPD(User user) {
		JSONObject responseObj = null;
		try {
			final String userNameR = user.getUserName();
			RestTemplate restTemplate = new RestTemplateBuilder()
					.setConnectTimeout(Duration.ofMillis(60000))
					.setReadTimeout(Duration.ofMillis(60000))
					.build();
			Optional<User> userD = getUserByUserName(userNameR);
			userD.orElseThrow(() -> new UsernameNotFoundException("User Not Found : " + userNameR));
			user = userD.map(User::new).get();
			String uuid = UUID.randomUUID().toString();
			String otp = uuid.substring(1, 8);
			user.setOtp(otp);
			user = save(user);
			final String BODY = String.join(
					System.getProperty("line.separator"),
					"<div style='width: 65%;background-color: #35855c7a;display: flex;justify-content: center;padding: 30px;font-family: cursive;'>",
					"<div style='width: 65%;background-color: #cf2b587d;margin-left:15%;'>",
					"<div style='padding: 10px;'>",
					"<h3><i style='color:#7f10a2'>Hi " + user.getName() + "</i></h3>",
					"<h4>Your password reset request has been initiated</h4>",
					"<h4 class='test1'>Use OTP :" + otp + "</h4>",
					"<h4>Regars,</h4>",
					"<h4>Team Todo App</h4>",
					"</div>",
					"</div>",
					"</div>");

			JSONObject reqJson = new JSONObject();
			reqJson.put("toAddress", user.getUserName());
			reqJson.put("messageBody", BODY);
			reqJson.put("messageSubject", "Todo App Password Reset");
			reqJson.put("requestingApplication", "TODO");
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.setBearerAuth(TODO_CONSTANTS.EMAIL_SERVICE_J_KEY);
			UriComponentsBuilder builder = UriComponentsBuilder
					.fromUriString(TODO_CONSTANTS.EMAIL_SERVICE_URI);
			UriComponents uriComponents = builder.build();
			HttpEntity<String> request = new HttpEntity<String>(reqJson.toString(), headers);
			ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.POST, request,
					String.class);
			responseObj = new JSONObject(response.getBody().toString());
			// System.out.println(responseObj.toString());
			user.setOtp(null);
		} catch (Exception e) {
			responseObj = new JSONObject();
			responseObj.put("sendStatus", "FAILED");
			responseObj.put("sendError", e.getMessage());
			e.printStackTrace();
		}
		return responseObj;
	}

	@SuppressWarnings("rawtypes")
	public TResponse getHeaderLinks() {
		TResponse response = new TResponse();
		Map<String, String> headerLinksResp = new HashMap<String, String>();
		try {
			TodoUserDetails userDetails = (TodoUserDetails) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();
			Collection roleCollection = userDetails.getAuthorities();
			Iterator roleIterator = roleCollection.iterator();
			SimpleGrantedAuthority role = null;
			while (roleIterator.hasNext()) {
				role = (SimpleGrantedAuthority) roleIterator.next();
			}
			List<TodoMessage> headerLinks = todoMessageService.getByType(TODO_CONSTANTS.HEADER_LINKS);
			for (TodoMessage message : headerLinks) {
				if (!message.isEnabled()) {
					continue;
				}
				if (message.getName().equals(TODO_CONSTANTS.MANAGE_USERS)) {
					if (role.getAuthority().equals(TODO_CONSTANTS.ROLE_ADMIN_USER)) {
						headerLinksResp.put(TODO_CONSTANTS.MANAGE_USERS, message.getValue());
					}
				} else {
					headerLinksResp.put(message.getName(), message.getValue());
				}
			}
			response.setKVResponse(headerLinksResp);
			response.setStatus(TODO_CONSTANTS.SUCCESS);
		} catch (Exception e) {
			e.printStackTrace();
			response.setError(e.getMessage());
			response.setStatus(TODO_CONSTANTS.FAILED);
		}

		return response;
	}

	public User getUserById(long id) {
		return userRepository.findById(id).get();
	}

	public TResponse exportTodoLists() {
		TResponse resp = new TResponse();
		StringBuilder respStr = new StringBuilder();
		User user = getLoggedInUser();
		List<TodoList> todoLists = listService.getListsByUserId(user.getUserName());
		List<TodoTask> tasklist = null;
		Map<Long, List<TodoTask>> todoTasks = new HashMap<Long, List<TodoTask>>();
		List<TaskStep> taskSteplist = null;
		Map<Long, List<TaskStep>> taskSteps = new HashMap<Long, List<TaskStep>>();
		respStr.append("TODO_LIST");// append list table indicator
		respStr.append("\nLIST_ID,LIST_NAME,GROUP_ID,GROUP_NAME,USER_ID,SORTED_TASKS,DATE_CREATED");// append list
																									// header
		for (TodoList todoList : todoLists) {
			respStr.append("\n");
			respStr.append(todoList.getListId()).append(TODO_CONSTANTS.DELIMETER)
					.append(todoList.getListName()).append(TODO_CONSTANTS.DELIMETER)
					.append(todoList.getGroupId()).append(TODO_CONSTANTS.DELIMETER)
					.append(todoList.getGroupName()).append(TODO_CONSTANTS.DELIMETER)
					.append(todoList.getUserId()).append(TODO_CONSTANTS.DELIMETER)
					.append(todoList.getSortedtasks()).append(TODO_CONSTANTS.DELIMETER)
					.append(todoList.getDateCreated());
			tasklist = taskService.getByListId(todoList.getListId());
			if (null != tasklist && tasklist.size() > 0) {
				todoTasks.put(todoList.getListId(), tasklist);
			}
		}

		respStr.append("TODO_TASK");// append task table indicator
		respStr.append(
				"\nTASK_ID,TASK_NAME,LIST_ID,LIST_NAME,IS_REPEAT,REMIND_ME,IS_IMPORTANT,DUE_DATE,NOTE,URI_REF,DATE_CREATED,DATE_COMPLETED,IS_COMPLETED,TASK_DESCRIPTION,USER_ID");// append
																																													// task
																																													// header
		for (Long listId : todoTasks.keySet()) {
			// tasklist = todoTasks.get(listId);
			for (TodoTask todoTask : todoTasks.get(listId)) {
				respStr.append("\n");
				respStr.append(todoTask.getTaskId()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.getTaskName()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.getListId()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.getListName()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.isRepeat()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.isRemindMe()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.isImportant()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.getDueDate()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.getNote()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.getUriRef()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.getDateCreated()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.getDateCompleted()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.isCompleted()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.getTaskDescription()).append(TODO_CONSTANTS.DELIMETER)
						.append(todoTask.getUserId());
				taskSteplist = taskStepService.getTaskStepsByTaskId(todoTask.getTaskId());
				if (null != taskSteplist && taskSteplist.size() > 0) {
					taskSteps.put(todoTask.getTaskId(), taskSteplist);
				}

			}
		}

		respStr.append("TASK_STEP");// append task step table indicator
		respStr.append("\nSTEP_ID,STEP_NAME,TASK_ID,CREATED_BY,DATE_CREATED,DATE_COMPLETED,IS_COMPLETED");// append task
																											// step
																											// header
		for (Long taskId : taskSteps.keySet()) {
			for (TaskStep taskStep : taskSteps.get(taskId)) {
				respStr.append("\n")
						.append(taskStep.getStepId()).append(TODO_CONSTANTS.DELIMETER)
						.append(taskStep.getStepName()).append(TODO_CONSTANTS.DELIMETER)
						.append(taskStep.getTaskId()).append(TODO_CONSTANTS.DELIMETER)
						.append(taskStep.getCreatedBy()).append(TODO_CONSTANTS.DELIMETER)
						.append(taskStep.getDateCreated()).append(TODO_CONSTANTS.DELIMETER)
						.append(taskStep.getDateCompleted()).append(TODO_CONSTANTS.DELIMETER)
						.append(taskStep.isCompleted());

			}
		}
		resp.setStatus(TODO_CONSTANTS.SUCCESS);
		resp.setResponse(respStr.toString());
		return resp;
	}

	protected User getLoggedInUser() {
		TodoUserDetails userDetails = (TodoUserDetails) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		return getUserByUserName(userDetails.getUsername()).get();
	}

	@SuppressWarnings("unchecked")
	public TResponse getMyAccountLinks() {
		TResponse resp = new TResponse();
		List<TodoMessage> links = todoMessageService.getByType(TODO_CONSTANTS.MY_ACCOUNT);
		List<TodoRoleMapping> roleMappings = roleMappingService.getRoleMappingsByEntityType(TODO_CONSTANTS.MY_ACCOUNT);
		TodoRoleMapping roleMapping = null;
		Map<String, String> myAccountLinks = new HashMap<String, String>();
		List<GrantedAuthority> userRoles = (List<GrantedAuthority>) SecurityContextHolder.getContext()
				.getAuthentication().getAuthorities();
		String userType = getUserTypeFromAuthorities(userRoles);
		String userRolesStr = getUserRolesString(userRoles);
		for (TodoMessage link : links) {
			if (userType.equals(TODO_CONSTANTS.ADMIN_USER)) {
				myAccountLinks.put(link.getName(), link.getValue());
			} else {
				roleMapping = roleMappings.stream().filter(o -> o.getEntityName().equals(link.getName())).findFirst()
						.orElse(null);
				if (roleMapping != null) {
					if (userRolesStr.contains(roleMapping.getRolesRequired())) {
						myAccountLinks.put(link.getName(), link.getValue());
					}
				}
			}
		}
		resp.setKVResponse(myAccountLinks);
		return resp;
	}

	public String getUserTypeFromAuthorities(List<GrantedAuthority> userRoles) {
		String userType = TODO_CONSTANTS.GUEST_USER;
		for (GrantedAuthority role : userRoles) {
			if (role.getAuthority().equals(TODO_CONSTANTS.ROLE_ADMIN)) {
				userType = TODO_CONSTANTS.ADMIN_USER;
				break;
			} else if (role.getAuthority().equals(TODO_CONSTANTS.ROLE_USER)) {
				userType = TODO_CONSTANTS.REDISTERED_USER;
			}
		}
		return userType;
	}

	public String getUserRolesString(List<GrantedAuthority> userRoles) {
		StringBuilder userRolesStr = new StringBuilder();
		for (GrantedAuthority role : userRoles) {
			if (!userRolesStr.toString().equals("")) {
				userRolesStr.append(",");
			}
			userRolesStr.append(role.getAuthority());
		}
		return userRolesStr.toString();
	}

}
