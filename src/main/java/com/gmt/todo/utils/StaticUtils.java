package com.gmt.todo.utils;

import java.util.Date;

public class StaticUtils {
    public static void main(String[] args) {
        printCurrentTime();
    }

    public static void printCurrentTime() {
        // System.out.println(System.currentTimeMillis());
        System.out.println(System.currentTimeMillis() + (1000 * 60 * 60 * 1));
        Date date = new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 1));
        System.out.println(date.getTime());
    }
}
