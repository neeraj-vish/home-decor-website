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
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BuyerServiceImpl implements BuyerService {

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    //SINGLE method for buyer registration 
    @Override
    public Buyer registerBuyer(Buyer buyer) {
        User user = buyer.getUser();

        if (user == null || user.getEmail() == null || user.getPassword() == null ||
            user.getEmail().trim().isEmpty() || user.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Email and password are required");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        if (buyerRepository.existsByPhoneNumber(buyer.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number already exists");
        }

        Role buyerRole = roleRepository.findByRoleName("buyer");
        if (buyerRole == null) {
            throw new RuntimeException("Role 'buyer' not found in database");
        }

        user.setRole(buyerRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        buyer.setUser(savedUser);
        return buyerRepository.save(buyer);
    }

    @Override
    public List<Buyer> getAllBuyers() {
        return buyerRepository.findAll();
    }

    @Override
    public Optional<Buyer> getBuyerById(Integer buyerId) {
        return buyerRepository.findById(buyerId);
    }

    @Override
    public void deleteBuyer(Integer buyerId) {
        buyerRepository.deleteById(buyerId);
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
	public Buyer saveBuyer(Buyer buyer) {
		// TODO Auto-generated method stub
		return null;
	}
}
