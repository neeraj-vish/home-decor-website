package com.homedecor.services;

import com.homedecor.entity.Buyer;

import java.util.List;
import java.util.Optional;

public interface BuyerService {

    // Core CRUD
    Buyer saveBuyer(Buyer buyer);
    List<Buyer> getAllBuyers();
    Optional<Buyer> getBuyerById(Integer buyerId);
    void deleteBuyer(Integer buyerId);

    // Duplicate-check and registration
    Buyer registerBuyer(Buyer buyer);
    boolean emailExists(String email);
    boolean phoneExists(String phone);
}
