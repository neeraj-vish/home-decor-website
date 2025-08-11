package com.homedecor.services.impl;
import com.homedecor.entity.Buyer;
import com.homedecor.entity.Role;
import com.homedecor.entity.User;
import com.homedecor.repository.BuyerRepository;
import com.homedecor.repository.RoleRepository;
import com.homedecor.repository.UserRepository;
import com.homedecor.services.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuyerServiceImpl implements BuyerService {

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public Buyer registerBuyer(Buyer buyer) {
        User user = buyer.getUser();
        if (user == null || user.getEmail() == null || user.getPassword() == null) {
            throw new IllegalArgumentException("Email and password are required");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        if (buyerRepository.existsByPhoneNumber(buyer.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number already exists");
        }

        Role buyerRole = roleRepository.findByRoleName("buyer");
        if (buyerRole == null) throw new RuntimeException("Role 'buyer' not found");

        user.setRole(buyerRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        buyer.setUser(userRepository.save(user));

        return buyerRepository.save(buyer);
    }

    @Override
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean phoneExists(String phone) {
        return buyerRepository.existsByPhoneNumber(phone);
    }

    @Override
    public List<Buyer> getAllBuyers() {
        return buyerRepository.findAll();
    }

    @Override
    public void deleteBuyer(Integer buyerId) {
        buyerRepository.deleteById(buyerId);
    }

    @Override
    public Buyer getBuyerByEmail(String email) {
        return buyerRepository.findByUserEmail(email)
            .orElseThrow(() -> new RuntimeException("Buyer not found for email: " + email));
    }
    
    

    @Override
    public Buyer findBuyerById(Integer id) {
        return buyerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Buyer not found with id: " + id));
    }
}

