package com.homedecor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class HomeDecor1Application {

	public static void main(String[] args) {
		SpringApplication.run(HomeDecor1Application.class, args);
	}

}
