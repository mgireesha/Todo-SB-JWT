package com.gmt.todo.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.gmt.todo.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
	
	Optional<User> findByUserName(String userName);

}
