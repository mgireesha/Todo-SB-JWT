package com.gmt.todo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gmt.todo.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

	Optional<User> findByUserName(String userName);

	User getByUserName(String userName);

	@Query("select user.listOrder from User as user where user.userName = :userName")
	String getUserListOrder(String userName);

	Optional<User> findById(Long id);

}
