package com.gmt.todo.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.WebProperties.Resources.Chain;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmt.todo.model.AuthenticationResponse;
import com.gmt.todo.service.JwtUtil;
import com.gmt.todo.service.TodoUserDetailsService;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter{

	@Autowired
	private TodoUserDetailsService todoUserDetailsService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		PrintWriter out;
		try {
			final String authorizationHeader =  request.getHeader("Authorization");
			String userName = null;
			String jwt = null;
			
			if(authorizationHeader != null && authorizationHeader.startsWith("Bearer")) {
				jwt = authorizationHeader.substring(7);
				userName = jwtUtil.extractUserName(jwt);
			}
			
			if(userName != null && SecurityContextHolder.getContext().getAuthentication()==null) {
				UserDetails userDetails = todoUserDetailsService.loadUserByUsername(userName);
				if(jwtUtil.validateToken(jwt, userDetails)) {
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
							new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
					usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				}
			}
			filterChain.doFilter(request, response);
		} catch (ExpiredJwtException e) {
			out = response.getWriter();
			out.write(new AuthenticationResponse("","TOKEN_EXPIRED",e.getMessage()).convertToJson());
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			out.flush();
			return;
		}catch(Exception e) {
			out = response.getWriter();
			out.write(new AuthenticationResponse("","FAILED",e.getMessage()).convertToJson());
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			out.flush();
			return;
		}
	}
	
	
}
