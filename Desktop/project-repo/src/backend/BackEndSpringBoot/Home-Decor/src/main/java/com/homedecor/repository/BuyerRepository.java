package com.homedecor.repository;

import com.homedecor.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuyerRepository extends JpaRepository<Buyer, Integer> {
    boolean existsByPhoneNumber(String phoneNumber);
}
