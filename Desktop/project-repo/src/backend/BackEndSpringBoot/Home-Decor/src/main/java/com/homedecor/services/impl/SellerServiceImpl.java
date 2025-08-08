package com.homedecor.services.impl;

import com.homedecor.entity.User;
import com.homedecor.dto.SellerDto;
import com.homedecor.entity.Role;
import com.homedecor.entity.Seller;
import com.homedecor.repository.RoleRepository;
import com.homedecor.repository.SellerRepository;
import com.homedecor.repository.UserRepository;
import com.homedecor.services.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @Autowired
    private RoleRepository roleRepository;


    @Override
    public Seller saveSeller(Seller seller) {
        User user = seller.getUser();

        if (user == null) {
            throw new IllegalArgumentException("Seller must have a User");
        }

        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("User password cannot be null or empty");
        }

        Role sellerRole = roleRepository.findByRoleName("seller");
        if (sellerRole == null) {
            throw new RuntimeException("Role 'seller' not found in database.Create first");
        }

        user.setRole(sellerRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        seller.setUser(savedUser);

        return sellerRepository.save(seller);
    }



    @Override
    public List<Seller> getAllSellers() {
        return sellerRepository.findAll();
    }

    @Override
    public Optional<Seller> getSellerById(Integer sellerId) {
        return sellerRepository.findById(sellerId);
    }

    @Override
    public void deleteSeller(Integer sellerId) {
        sellerRepository.deleteById(sellerId);
    }
    
        
    
 // Add these new methods for checking field uniqueness
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByGstNumber(String gst) {
        return sellerRepository.existsByGstNumber(gst);
    }

    public boolean existsByLicenseNumber(String lic) {
        return sellerRepository.existsByLicenseNumber(lic);
    }
    
    
    @Override
    public SellerDto getSellerByUserEmail(String email) {
        Seller seller = sellerRepository.findByUserEmail(email);
        if (seller == null) throw new RuntimeException("Seller not found for email: " + email);

        return new SellerDto(
        	    seller.getSellerId(),
        	    seller.getCompanyName(),
        	    seller.getCompanyAddress(),
        	    seller.getGstNumber(),
        	    seller.getLicenseNumber(),
        	    seller.getUser().getEmail()
        	    
        	);

    }

    
    @Override
    public SellerDto updateSeller(Integer id, SellerDto sellerDto) {
        Seller seller = sellerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Seller not found with id: " + id));

        // Update fields
        seller.setCompanyName(sellerDto.getCompanyName());
        seller.setCompanyAddress(sellerDto.getCompanyAddress());
        seller.setGstNumber(sellerDto.getGstNumber());
        seller.setLicenseNumber(sellerDto.getLicenseNumber());

        Seller updatedSeller = sellerRepository.save(seller);
        return new SellerDto(updatedSeller);
    }

    
    
    
    
}
