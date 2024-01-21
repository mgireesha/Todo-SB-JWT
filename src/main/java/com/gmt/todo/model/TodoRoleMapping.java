package com.gmt.todo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TodoRoleMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String entityType;
    private String entityName;
    private String rolesRequired;
    private boolean enabled;

    public TodoRoleMapping() {
    }

    public TodoRoleMapping(String entityType, String entityName, String rolesRequired, boolean enabled) {
        this.entityType = entityType;
        this.entityName = entityName;
        this.rolesRequired = rolesRequired;
        this.enabled = enabled;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getRolesRequired() {
        return rolesRequired;
    }

    public void setRolesRequired(String rolesRequired) {
        this.rolesRequired = rolesRequired;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "TodoRoleMapping [id=" + id + ", entityType=" + entityType + ", entityName=" + entityName
                + ", rolesRequired=" + rolesRequired + ", enabled=" + enabled + "]";
    }

}
