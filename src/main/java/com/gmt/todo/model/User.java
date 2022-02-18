package com.gmt.todo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String userName;
	private String passWord;
	private boolean active;
	private String roles;
	private String otp;
	@Transient
	private String currentPassword;
	
	public User(User user) {
		this.id=user.getId();
		this.name=user.getName();
		this.userName=user.getUserName();
		this.passWord=user.getPassWord();
		this.active=user.isActive();
		this.roles=user.getRoles();
		this.otp=user.getOtp();
	}
	
	public String getCurrentPassword() {
		return currentPassword;
	}

	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassWord() {
		return passWord;
	}
	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	
	public String getRoles() {
		return roles;
	}
	public void setRoles(String roles) {
		this.roles = roles;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public User(String userName, String passWord, boolean active, String roles) {
		this.userName = userName;
		this.passWord = passWord;
		this.active = active;
		this.roles = roles;
	}
	
	
	public User(String name, String userName, String passWord, boolean active, String roles) {
		this.name = name;
		this.userName = userName;
		this.passWord = passWord;
		this.active = active;
		this.roles = roles;
	}
	public User() {
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", userName=" + userName + ", passWord=" + passWord + ", active="
				+ active + ", roles=" + roles + ", otp=" + otp + "]";
	}
	
}
