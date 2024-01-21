package com.gmt.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.TodoMessage;
import com.gmt.todo.repository.TodoMessageRepository;
import com.gmt.todo.utils.TODO_CONSTANTS;

@Service
public class TodoMessageService {

    @Autowired
    private TodoMessageRepository todoMessageRepository;

    public TResponse createMessage(TodoMessage message) {
        TResponse response = new TResponse();
        TodoMessage existingMessage = todoMessageRepository.findByNameAndType(message.getName(), message.getType());
        if (existingMessage != null) {
            response.setError("Message with name and type : " + message.getName() + " , " + message.getType()
                    + " already exists!");
            response.setStatus(TODO_CONSTANTS.FAILED);
            return response;
        }
        message = todoMessageRepository.save(message);
        response.setMessage(message);
        response.setStatus(TODO_CONSTANTS.SUCCESS);
        return response;
    }

    public TResponse updateMessageByName(TodoMessage message) {
        TResponse response = new TResponse();
        TodoMessage existingMessage = todoMessageRepository.findByName(message.getName());
        if (existingMessage == null) {
            response.setError("Message : " + message.getName() + " not found!");
            response.setStatus(TODO_CONSTANTS.FAILED);
        } else {
            message.setMessageId(existingMessage.getMessageId());
            message = todoMessageRepository.save(message);
            response.setMessage(message);
            response.setStatus(TODO_CONSTANTS.SUCCESS);
        }
        return response;
    }

    public TodoMessage findByName(String messageName) {
        try {
            return todoMessageRepository.findByName(messageName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<TodoMessage> getByType(String type) {
        return todoMessageRepository.getByType(type);
    }

    public void removeMessageById(long messageId) {
        todoMessageRepository.deleteById(messageId);
    }

    public void removeMessageType(String type) {
        List<TodoMessage> msgTypes = todoMessageRepository.getByType(type);
        for (TodoMessage msg : msgTypes)
            removeMessageById(msg.getMessageId());
    }

    public void removeMessageName(String name) {
        TodoMessage msg = todoMessageRepository.findByName(name);
        if (msg != null)
            removeMessageById(msg.getMessageId());
    }

    public TodoMessage deleteByName(String name) {
        TodoMessage message = todoMessageRepository.findByName(name);
        todoMessageRepository.deleteById(message.getMessageId());
        return message;
    }
}
