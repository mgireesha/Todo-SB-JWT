package com.gmt.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.gmt.todo.service.JwtUtil;
import com.gmt.todo.service.TodoRoleMappingService;
import com.gmt.todo.model.AuthenticationRequest;
import com.gmt.todo.model.AuthenticationResponse;
import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.TodoRoleMapping;
import com.gmt.todo.service.TodoUserDetailsService;
import com.gmt.todo.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/todo")
public class HomeController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private TodoUserDetailsService todoUserDetailsService;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private UserService userService;

	@Autowired
	TodoRoleMappingService roleMappingService;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {
		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
							authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			return ResponseEntity.ok(new AuthenticationResponse("", "failed", "Incorrect username or password"));
		}
		final UserDetails userDetails = todoUserDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}

	@RequestMapping("/accessDenied")
	public ModelAndView accessDenied() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("accessDenied");
		return mv;
	}

	@RequestMapping("/header-links")
	public TResponse getHeaderLinks() {
		return userService.getHeaderLinks();
	}

	@PostMapping("/role-mapping")
	public TResponse createRoleMapping(@RequestBody TodoRoleMapping todoRoleMapping) {
		return roleMappingService.createRoleMapping(todoRoleMapping);
	}

}
