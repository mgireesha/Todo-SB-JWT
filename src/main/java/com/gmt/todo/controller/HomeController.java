package com.gmt.todo.controller;

import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gmt.todo.service.JwtUtil;
import com.gmt.todo.model.AuthenticationRequest;
import com.gmt.todo.model.AuthenticationResponse;
import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.User;
import com.gmt.todo.service.TodoUserDetailsService;
import com.gmt.todo.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/todo")
public class HomeController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private TodoUserDetailsService todoUserDetailsService;
	
	@Autowired
	private JwtUtil jwtTokenUtil;
	
	private static final String FAILED = "failed";
	
	private static final String SUCCESS = "success";
	
	private static final String WRONG_PASSWORD = "WRONG_PASSWORD";

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), 
					authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			return ResponseEntity.ok(new AuthenticationResponse("","failed","Incorrect username or password"));
		}
		final UserDetails userDetails = todoUserDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}

	@RequestMapping(method = RequestMethod.POST, value = "/signup")
	public TResponse signup(@RequestBody User user) {
		TResponse resp = new TResponse();
		try {
			user = userService.resgisterUser(user);
			if(null!=user) {
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
			resp.setStatus((String)respObj.get("sendStatus"));
			resp.setUser(user);
			try {
				resp.setError(respObj.get("sendError").toString());
			} catch (Exception e) {
				resp.setError(e.getMessage());
			}
		} catch (Exception e) {
			try {
				resp.setStatus((String)respObj.get("sendStatus"));
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
			//userOpt.orElseThrow(()-> new UsernameNotFoundException("User Not Found : "+user.getUserName()));
			User tempUser = userOpt.map(User::new).get();
			if(tempUser.getOtp().equals(user.getOtp())) {
				tempUser.setPassWord(user.getPassWord());
				user = userService.save(tempUser);
				resp.setStatus(SUCCESS);
			}else {
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
			String userName=user.getUserName();
			Optional<User> userOpt = userService.getUserByUserName(user.getUserName());
			userOpt.orElseThrow(()-> new UsernameNotFoundException("User Not Found : "+userName));
			User tempUser = userOpt.map(User::new).get();
			if(tempUser.getPassWord().equals(user.getCurrentPassword())) {
				tempUser.setPassWord(user.getPassWord());
				user = userService.save(tempUser);
				resp.setStatus(SUCCESS);
			}else {
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
	
	@RequestMapping("/ManageUsers")
	public ModelAndView manageUsers() {
		ModelAndView mv = new ModelAndView();
		mv.addObject("users", userService.getAllUsers());
		mv.setViewName("ManageUsers");
		return mv;
	}

	@RequestMapping("/accessDenied")
	public ModelAndView accessDenied() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("accessDenied");
		return mv;
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
}
