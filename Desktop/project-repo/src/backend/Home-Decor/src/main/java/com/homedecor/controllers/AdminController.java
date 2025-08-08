package com.homedecor.controllers;

import com.homedecor.entity.Admin;
import com.homedecor.repository.AdminRepository;
import com.homedecor.request.AdminLoginRequest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173") 
public class AdminController {

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequest request) {
        Admin admin = adminRepo.findByEmail(request.getEmail()).orElse(null);
        if (admin == null || !passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        Map<String, Object> role = new HashMap<>();
        role.put("roleId", 1);
        role.put("roleName", "Admin");

        Map<String, Object> user = new HashMap<>();
        user.put("email", admin.getEmail());
        user.put("role", role);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

}
