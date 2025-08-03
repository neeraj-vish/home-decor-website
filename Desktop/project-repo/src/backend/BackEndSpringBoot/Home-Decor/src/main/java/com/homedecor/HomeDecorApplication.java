package com.homedecor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.homedecor")
public class HomeDecorApplication {

    public static void main(String[] args) {
        SpringApplication.run(HomeDecorApplication.class, args);
    }
}

