package com.gmt.todo.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class AuthenticationResponse {
	
	private final String jwt;
	private String status;
	private String error;
	
	public AuthenticationResponse() {
		this.jwt = "";
		
	}
	
	public AuthenticationResponse(String jwt, String status, String error) {
		this.jwt = "";
		this.status = status;
		this.error = error;
	}

	@Override
	public String toString() {
		return "AuthenticationResponse [jwt=" + jwt + ", status=" + status + ", error=" + error + "]";
	}

	public AuthenticationResponse(String jwt) {
		this.jwt = jwt;
	}

	public String getJwt() {
		return jwt;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}
	
	public String convertToJson() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        return mapper.writeValueAsString(this);
    }
	
}
