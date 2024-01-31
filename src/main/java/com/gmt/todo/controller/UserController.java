package com.gmt.todo.controller;

import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.todo.model.AuthenticationRequest;
import com.gmt.todo.model.AuthenticationResponse;
import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.model.User;
import com.gmt.todo.service.JwtUtil;
import com.gmt.todo.service.TodoUserDetailsService;
import com.gmt.todo.service.UserService;
import com.gmt.todo.utils.TODO_CONSTANTS;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/todo")
public class UserController {

	private static final String FAILED = "failed";

	private static final String SUCCESS = "success";

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private TodoUserDetailsService todoUserDetailsService;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@RequestMapping(method = RequestMethod.POST, value = "/user/register")
	public TResponse signup(@RequestBody User user) {
		TResponse resp = new TResponse();
		try {
			Optional<User> userOpt = userService.getUserByUserName(user.getUserName());
			if (userOpt.isPresent()) {
				resp.setStatus(TODO_CONSTANTS.FAILED);
				resp.setError(TODO_CONSTANTS._ERR_USER_EXISTS);
				resp.setErrorMessage("User: " + user.getUserName() + " is already exists.");
				return resp;
			}
			user = userService.resgisterUser(user);
			if (null != user) {
				resp.setStatus(TODO_CONSTANTS.SUCCESS);
				user.setPassWord(null);
				resp.setResponse("User registration successful");
				resp.setUser(user);
			}
		} catch (Exception e) {
			resp.setStatus(TODO_CONSTANTS.FAILED);
			resp.setError(TODO_CONSTANTS._ERR_UNKNOWN_EXCEPTION);
			resp.setErrorMessage(e.getMessage());
		}
		return resp;
	}

	@RequestMapping(value = "/user/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
							authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			return ResponseEntity
					.ok(new AuthenticationResponse("", TODO_CONSTANTS.FAILED,
							TODO_CONSTANTS._ERR_INCORRECT_USERNAME_PASSWORD, "Incorrect username or password"));
		}
		final UserDetails userDetails = todoUserDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(jwt, TODO_CONSTANTS.SUCCESS, null));
	}

	@GetMapping("/user/@self")
	public TResponse getLoggedInUser() {
		TResponse response = new TResponse(TODO_CONSTANTS.SUCCESS, (String) null);
		TodoUserDetails userDetails = (TodoUserDetails) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		Optional<User> userO = userService.getUserByUserName(userDetails.getUsername());
		User user = userO.get();
		user.setPassWord(null);
		response.setUser(user);
		return response;
	}

	@GetMapping("/user/id/{id}")
	public TResponse getUserById(@RequestParam String id) {
		TResponse response = new TResponse(TODO_CONSTANTS.SUCCESS, (String) null);
		User user = userService.getUserById(Long.parseLong(id));
		response.setUser(user);
		return response;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/init-reset-pwd")
	public TResponse initRPD(@RequestBody User user) {
		TResponse resp = new TResponse();
		JSONObject respObj = new JSONObject();
		try {
			respObj = userService.initiateRPD(user);
			resp.setStatus((String) respObj.get("sendStatus"));
			resp.setUser(user);
			try {
				resp.setError(respObj.get("sendError").toString());
			} catch (Exception e) {
				resp.setError(e.getMessage());
			}
		} catch (Exception e) {
			try {
				resp.setStatus((String) respObj.get("sendStatus"));
				resp.setError(respObj.get("sendError").toString());
			} catch (Exception e2) {
				resp.setStatus(e2.getMessage());
			}
			e.printStackTrace();
		}
		return resp;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/reset-pwd")
	public TResponse resetPassword(@RequestBody User user) {
		TResponse resp = new TResponse();
		try {
			Optional<User> userOpt = userService.getUserByUserName(user.getUserName());
			// userOpt.orElseThrow(()-> new UsernameNotFoundException("User Not Found :
			// "+user.getUserName()));
			User tempUser = userOpt.map(User::new).get();
			if (tempUser.getOtp().equals(user.getOtp())) {
				tempUser.setPassWord(user.getPassWord());
				user = userService.save(tempUser);
				resp.setStatus(SUCCESS);
			} else {
				resp.setStatus("otpNotFound");
				resp.setError("Unable to reset password. Verify otp again.");
			}
			resp.setUser(user);
		} catch (Exception e) {
			resp.setStatus(FAILED);
			resp.setError(e.getMessage());
			e.printStackTrace();
		}
		return resp;
	}

	@PutMapping("/user/password")
	public TResponse changePassword(@RequestBody User user) {
		TResponse resp = new TResponse();
		try {
			String userName = user.getUserName();
			Optional<User> userOpt = userService.getUserByUserName(user.getUserName());
			userOpt.orElseThrow(() -> new UsernameNotFoundException("User Not Found : " + userName));
			User tempUser = userOpt.map(User::new).get();
			if (user.getCurrentPassword().equals(user.getPassWord())) {
				resp.setStatus(TODO_CONSTANTS.FAILED);
				resp.setError(TODO_CONSTANTS._ERR_SAME_CURRENT_AND_NEW_PASSWORDS);
				resp.setErrorMessage("Current and New password cannot be same.");
				return resp;
			} else if (tempUser.getPassWord().equals(user.getCurrentPassword())) {
				tempUser.setPassWord(user.getPassWord());
				user = userService.save(tempUser);
				resp.setStatus(TODO_CONSTANTS.SUCCESS);
			} else {
				resp.setStatus(TODO_CONSTANTS.FAILED);
				resp.setError(TODO_CONSTANTS._ERR_WRONG_CURRENT_PASSWORD);
				resp.setErrorMessage("Current password is worong.");
				return resp;
			}
			user.setPassWord(null);
			resp.setUser(user);
		} catch (UsernameNotFoundException e) {
			resp.setStatus(TODO_CONSTANTS.FAILED);
			resp.setErrorMessage(e.getMessage());
			resp.setError(TODO_CONSTANTS._ERR_USER_NOT_FOUND);
			e.printStackTrace();
		} catch (Exception e) {
			resp.setStatus(TODO_CONSTANTS.FAILED);
			resp.setErrorMessage(e.getMessage());
			resp.setError(TODO_CONSTANTS._ERR_UNKNOWN_EXCEPTION);
			e.printStackTrace();
		}
		return resp;
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/user/{userId}")
	public TResponse deleteUser(@PathVariable String userId) {
		return userService.deleteUser(Long.parseLong(userId));
	}

	@RequestMapping("/ManageUsers")
	public List<User> manageUsers() {
		return userService.getAllUsers();
	}

	@RequestMapping("/user/username/availability/{userName}")
	public TResponse checkUserName(@PathVariable String userName) {
		TResponse resp = new TResponse();
		Optional<User> userOp = userService.getUserByUserName(userName);
		if (userOp.isPresent()) {
			resp.setStatus(TODO_CONSTANTS.USERNAME_NOT_AVAILABLE);
			resp.setError(TODO_CONSTANTS._ERR_USER_EXISTS);
			resp.setErrorMessage("User id already exists");
		} else {
			resp.setStatus(TODO_CONSTANTS.USERNAME_AVAILABLE);
			resp.setResponse("User id available");
		}
		return resp;
	}

	@GetMapping("/user/export-todo-lists")
	public TResponse exportTodoLists() {
		return userService.exportTodoLists();
	}

	@GetMapping("/user/my-account-links")
	public TResponse getMyAccountLinks() {
		return userService.getMyAccountLinks();
	}

}
