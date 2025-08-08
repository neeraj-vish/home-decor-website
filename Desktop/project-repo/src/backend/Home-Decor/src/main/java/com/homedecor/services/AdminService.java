package com.homedecor.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.homedecor.entity.Admin;
import com.homedecor.repository.AdminRepository;

@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String setAdminPassword(String email, String plainPassword) {
        Optional<Admin> optionalAdmin = adminRepository.findByEmail(email);

        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            String hashedPassword = passwordEncoder.encode(plainPassword);
            admin.setPassword(hashedPassword);
            adminRepository.save(admin);
            return "Password set successfully.";
        } else {
            return "Admin not found.";
        }
    }
}

