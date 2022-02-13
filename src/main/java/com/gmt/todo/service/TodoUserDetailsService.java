package com.gmt.todo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gmt.todo.model.TodoUserDetails;
import com.gmt.todo.model.User;

@Service
public class TodoUserDetailsService implements UserDetailsService {

	@Autowired
	private UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user= userService.getUserByUserName(username);
		user.orElseThrow(()-> new UsernameNotFoundException("Not Found : "+username));
		return user.map(TodoUserDetails::new).get();
		
	}

}
