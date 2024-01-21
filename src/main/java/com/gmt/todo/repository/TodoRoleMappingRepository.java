package com.gmt.todo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.gmt.todo.model.TodoRoleMapping;

@Repository
public interface TodoRoleMappingRepository extends CrudRepository<TodoRoleMapping, Long> {

    List<TodoRoleMapping> getByEntityType(String type);

}
