package com.gmt.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.TodoMessage;
import com.gmt.todo.service.TodoMessageService;

@RestController
@RequestMapping("/todo")
@CrossOrigin
public class TodoMessageController {

    @Autowired
    private TodoMessageService messageService;

    @RequestMapping(method = RequestMethod.POST, value = "/message")
    public TResponse createMessage(@RequestBody TodoMessage message) {
        return messageService.createMessage(message);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/message")
    public TResponse updateMessage(@RequestBody TodoMessage message) {
        return messageService.updateMessageByName(message);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/message/{name}")
    public TodoMessage removeMessageByName(@PathVariable String name) {
        return messageService.deleteByName(name);
    }
}
