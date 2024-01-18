package com.gmt.todo.controller;

import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.User;
import com.gmt.todo.service.UserService;

@RestController
@RequestMapping("/todo")
public class UserController {

	private static final String FAILED = "failed";

	private static final String SUCCESS = "success";

	private static final String WRONG_PASSWORD = "WRONG_PASSWORD";

	private static final String USER_EXISTS = "USER_EXISTS";

	private static final String USER_AVAILABLE = "USER_AVAILABLE";

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.POST, value = "/signup")
	public TResponse signup(@RequestBody User user) {
		TResponse resp = new TResponse();
		try {
			Optional<User> userOpt = userService.getUserByUserName(user.getUserName());
			if (userOpt.isPresent()) {
				resp.setStatus(USER_EXISTS);
				resp.setError(user.getUserName());
				return resp;
			}
			user = userService.resgisterUser(user);
			if (null != user) {
				resp.setStatus(SUCCESS);
				resp.setError(null);
				user.setPassWord(null);
				resp.setUser(user);
			}
		} catch (Exception e) {
			resp.setStatus(FAILED);
			resp.setError(e.getMessage());
		}
		return resp;
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

	@RequestMapping(method = RequestMethod.POST, value = "/change-pwd")
	public TResponse changePassword(@RequestBody User user) {
		TResponse resp = new TResponse();
		try {
			String userName = user.getUserName();
			Optional<User> userOpt = userService.getUserByUserName(user.getUserName());
			userOpt.orElseThrow(() -> new UsernameNotFoundException("User Not Found : " + userName));
			User tempUser = userOpt.map(User::new).get();
			if (tempUser.getPassWord().equals(user.getCurrentPassword())) {
				tempUser.setPassWord(user.getPassWord());
				user = userService.save(tempUser);
				resp.setStatus(SUCCESS);
			} else {
				resp.setStatus(WRONG_PASSWORD);
				resp.setError("Current password is worong, try again.");
			}
			resp.setUser(user);
		} catch (Exception e) {
			resp.setStatus(FAILED);
			resp.setError(e.getMessage());
			e.printStackTrace();
		}
		return resp;
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/user/{userId}")
	public TResponse deleteUser(@PathVariable String userId) {
		TResponse resp = new TResponse();
		try {
			userService.deleteUser(Long.parseLong(userId));
			resp.setStatus("success");
		} catch (Exception e) {
			resp.setStatus("failed");
			resp.setError(e.getMessage());
		}
		return resp;
	}

	@RequestMapping("/ManageUsers")
	public List<User> manageUsers() {
		return userService.getAllUsers();
	}

	@RequestMapping("/user/checkUsername/{userName}")
	public TResponse checkUserName(@PathVariable String userName) {
		TResponse resp = new TResponse();
		Optional<User> userOp = userService.getUserByUserName(userName);
		if (userOp.isPresent()) {
			resp.setStatus(USER_EXISTS);
			resp.setError(userName);
		} else {
			resp.setStatus(USER_AVAILABLE);
			resp.setError(userName);
		}
		return resp;
	}
}
