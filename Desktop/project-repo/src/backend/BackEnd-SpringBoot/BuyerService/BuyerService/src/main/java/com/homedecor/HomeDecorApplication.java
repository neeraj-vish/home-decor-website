package com.homedecor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication(scanBasePackages = "com.homedecor.buyerservice")
@EnableDiscoveryClient
public class HomeDecorApplication {
    public static void main(String[] args) {
        SpringApplication.run(HomeDecorApplication.class, args);
    }
}
