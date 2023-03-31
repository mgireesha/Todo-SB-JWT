package com.gmt.todo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.gmt.todo.model.TodoMessage;

public interface TodoMessageRepository extends CrudRepository<TodoMessage, Long> {

    List<TodoMessage> getByType(String type);

    TodoMessage getByName(String name);

}
