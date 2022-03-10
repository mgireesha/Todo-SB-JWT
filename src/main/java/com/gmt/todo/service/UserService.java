package com.gmt.todo.service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.gmt.todo.model.TodoList;
import com.gmt.todo.model.TodoTask;
import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.model.User;
import com.gmt.todo.repository.UserRepository;

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
	
	public List<User> getAllUsers() {
		return (List<User>) userRepository.findAll();
	}
	
	public Optional<User> getUserByUserName(String username){
		return userRepository.findByUserName(username);
	}
	
	public User save(User user) {
		return userRepository.save(user);
	}
	
	public void deleteUser(Long userId) {
		try {
			listService.deleteListsOfUser(userRepository.findById(userId).map(User::new).get());
			userRepository.deleteById(userId);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public User resgisterUser(User user) {
		user.setRoles("ROLE_USER");
		user.setActive(true);
		user = userRepository.save(user);
		TodoList todoList = new TodoList("Tasks",user.getUserName(),LocalDate.now(),listService.generateGroupId(),"default");
		TodoList imp = new TodoList("Important",user.getUserName(),LocalDate.now(),listService.generateGroupId(),"default");
		imp = listService.addNewList(imp, new TodoUserDetails(user));
		todoList = listService.addNewList(todoList, new TodoUserDetails(user));
		TodoTask todoTask = new TodoTask("Get up early!", "", false, "Go to work", todoList.getListId(), todoList.getListName());
		todoTask.setUserId(user.getUserName());
		todoTask.setImportant(true);
		taskService.addNewTask(todoTask);
		return user;
	}
	
	public JSONObject initiateRPD(User user){
		JSONObject responseObj = null;
		try {
			final String userNameR = user.getUserName();
			RestTemplate restTemplate = new RestTemplateBuilder()
					.setConnectTimeout(Duration.ofMillis(60000))
					.setReadTimeout(Duration.ofMillis(60000))
					.build();
			Optional<User> userD = getUserByUserName(userNameR);
			userD.orElseThrow(()-> new UsernameNotFoundException("User Not Found : "+userNameR));
			user = userD.map(User::new).get();
			String uuid = UUID.randomUUID().toString();
	        String otp=uuid.substring(1,8);
	        user.setOtp(otp);
	        user = save(user);
			final String BODY = String.join(
	                System.getProperty("line.separator"),
	                "<h3>Hi <i style='color:#7f10a2'>"+user.getName()+"</i></h3>",
	                "<h4>Your password reset request has been initiated</h4>",
	                "<h4>Use OTP :"+otp+"</h4>",
	                System.getProperty("line.separator"),
	                "<h4>Regars,</h4>",
	                "<h4>Team Todo App</h4>"
	            );
		
			JSONObject reqJson = new JSONObject();
			reqJson.put("toAddress", user.getUserName());
			reqJson.put("messageBody", BODY);
			reqJson.put("messageSubject", "Todo App Password Reset");
			reqJson.put("requestingApplication", "TODO");
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.setBearerAuth("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbiIsImV4cCI6MTY0NzgzMTg0MiwiaWF0IjoxNjQ2OTQyODA5fQ.C1kko5H7XUT-nrE_q863WeSeW4pUSR0QHPifjxPQGlk");
			UriComponentsBuilder builder = UriComponentsBuilder.fromUriString("https://send-email-sb.herokuapp.com/sendEmail");
			UriComponents uriComponents = builder.build();
			HttpEntity<String> request = new HttpEntity<String>(reqJson.toString(),headers);
			ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.POST,request,String.class);
			responseObj = new JSONObject(response.getBody().toString());
			//System.out.println(responseObj.toString());
			user.setOtp(null);
		} catch (Exception e) {
			responseObj = new JSONObject();
			responseObj.put("sendStatus", "FAILED");
			responseObj.put("sendError", e.getMessage());
			e.printStackTrace();
		}
		return responseObj;
	}
	
}
