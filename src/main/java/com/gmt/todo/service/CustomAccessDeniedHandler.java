package com.gmt.todo.service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;

import com.gmt.todo.model.TodoUserDetails;

public class CustomAccessDeniedHandler implements AccessDeniedHandler{

	public static final Logger LOG = LoggerFactory.getLogger(CustomAccessDeniedHandler.class);
	
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		TodoUserDetails user = (TodoUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      if (user != null) {
          LOG.info("User: " + user.getUsername() + " attempted to access the protected URL: "+ request.getRequestURI());
      }else {
    	  LOG.info("user is null");
      }
      response.sendRedirect(request.getContextPath() + "/accessDenied");
		
	}

}
