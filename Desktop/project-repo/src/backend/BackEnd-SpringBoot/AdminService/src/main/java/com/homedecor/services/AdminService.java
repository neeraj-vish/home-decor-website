package com.homedecor.services;

import com.homedecor.dto.UserDto;
import com.homedecor.entity.LoginRequest;
import com.homedecor.entity.LoginResponse;

import java.util.List;

public interface AdminService {
    LoginResponse login(LoginRequest loginRequest);
    List<UserDto> getAllUsers();
}
