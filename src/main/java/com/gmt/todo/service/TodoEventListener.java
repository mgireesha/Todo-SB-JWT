package com.gmt.todo.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.gmt.todo.utils.TODO_CONSTANTS;

@Component
public class TodoEventListener {

    @Value("${com.gmt.todo.env}")
    private String appEnv;

    @SuppressWarnings("deprecation")
    @EventListener(ApplicationReadyEvent.class)
    public void runAppInBrowser() {
        try {
            if (!appEnv.equalsIgnoreCase(TODO_CONSTANTS.PRODUCTION)) {
                Runtime runtime = Runtime.getRuntime();
                String url = "http://localhost:8087";
                runtime.exec("rundll32 url.dll,FileProtocolHandler " + url);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
