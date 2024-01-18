package com.gmt.todo.service;

import java.io.IOException;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class TodoEventListener {

    @SuppressWarnings("deprecation")
    @EventListener(ApplicationReadyEvent.class)
    public void runAppInBrowser() {
        try {
            Runtime runtime = Runtime.getRuntime();
            String url = "http://localhost:8087";
            runtime.exec("rundll32 url.dll,FileProtocolHandler " + url);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
