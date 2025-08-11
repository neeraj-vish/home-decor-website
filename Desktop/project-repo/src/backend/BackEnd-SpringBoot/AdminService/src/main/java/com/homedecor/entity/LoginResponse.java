package com.homedecor.entity;

import com.homedecor.dto.UserDto;

public class LoginResponse {
    private String token;
    private String message;
    private UserDto user; 

    public LoginResponse() {}
    
    public LoginResponse(String token, String message) {
        this.token = token;
        this.message = message;
        this.user = null;
    }

    public LoginResponse(String token, String message, UserDto user) {
        this.token = token;
        this.message = message;
        this.user = user;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }
}