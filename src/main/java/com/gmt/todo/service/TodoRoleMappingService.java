package com.gmt.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmt.todo.model.TResponse;
import com.gmt.todo.model.TodoRoleMapping;
import com.gmt.todo.repository.TodoRoleMappingRepository;

@Service
public class TodoRoleMappingService {

    @Autowired
    private TodoRoleMappingRepository roleMappingRepository;

    public TResponse createRoleMapping(TodoRoleMapping roleMapping) {
        TResponse resp = new TResponse();
        roleMapping = roleMappingRepository.save(roleMapping);
        resp.setRoleMapping(roleMapping);
        return resp;
    }

    public List<TodoRoleMapping> getRoleMappingsByEntityType(String type) {
        return roleMappingRepository.getByEntityType(type);
    }

}
