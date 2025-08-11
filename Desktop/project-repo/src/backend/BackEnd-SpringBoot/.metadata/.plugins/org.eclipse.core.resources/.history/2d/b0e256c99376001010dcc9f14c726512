package com.homedecor.controllers;

import com.homedecor.entity.LoginRequest;
import com.homedecor.entity.LoginResponse;
import com.homedecor.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AuthController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        return adminService.login(req);
    }
}
