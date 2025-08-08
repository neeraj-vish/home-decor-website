package com.homedecor.services;

import com.homedecor.dto.SellerDto;
import com.homedecor.entity.Seller;

import java.util.List;
import java.util.Optional;

public interface SellerService {

    Seller saveSeller(Seller seller);

    List<Seller> getAllSellers();

    Optional<Seller> getSellerById(Integer sellerId);

    void deleteSeller(Integer sellerId);
    
    boolean existsByEmail(String email);
    boolean existsByGstNumber(String gst);
    boolean existsByLicenseNumber(String lic);
    SellerDto getSellerByUserEmail(String email);
    SellerDto updateSeller(Integer id, SellerDto sellerDto);   
}
