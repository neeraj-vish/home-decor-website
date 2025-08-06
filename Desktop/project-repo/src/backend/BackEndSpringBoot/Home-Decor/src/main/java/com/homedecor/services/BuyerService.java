package com.homedecor.services;

import com.homedecor.entity.Buyer;
import java.util.List;

public interface BuyerService {
    Buyer registerBuyer(Buyer buyer);
    boolean emailExists(String email);
    boolean phoneExists(String phone);
    List<Buyer> getAllBuyers();
    void deleteBuyer(Integer buyerId);
    Buyer getBuyerByEmail(String email);  
    Buyer findBuyerById(Integer id); 

}

