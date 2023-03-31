package com.gmt.todo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TodoMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long messageId;
    private String name;
    private String value;
    private String type;
    private boolean enabled;

    public long getMessageId() {
        return messageId;
    }

    public void setMessageId(long messageId) {
        this.messageId = messageId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public TodoMessage setValue(String value) {
        this.value = value;
        return this;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "TodoMessage [messageId=" + messageId + ", name=" + name + ", value=" + value + ", type=" + type
                + ", enabled=" + enabled + "]";
    }

    public TodoMessage() {
    }

    public TodoMessage(String type, String name, String value) {
        this.type = type;
        this.name = name;
        this.value = value;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

}
