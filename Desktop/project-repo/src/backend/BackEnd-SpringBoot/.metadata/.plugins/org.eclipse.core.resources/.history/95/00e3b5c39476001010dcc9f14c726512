package com.homedecor.controllers;

import com.homedecor.dto.UserDto;
import com.homedecor.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/admin/users")
    public List<UserDto> allUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/buyers/getAll")
    public List<UserDto> getAllBuyers() {
        return adminService.getAllUsers().stream()
                .filter(user -> "Buyer".equals(user.getRole()))
                .collect(Collectors.toList());
    }

    @GetMapping("/sellers/getAllSellers")
    public List<UserDto> getAllSellers() {
        return adminService.getAllUsers().stream()
                .filter(user -> "Seller".equals(user.getRole()))
                .collect(Collectors.toList());
    }
}