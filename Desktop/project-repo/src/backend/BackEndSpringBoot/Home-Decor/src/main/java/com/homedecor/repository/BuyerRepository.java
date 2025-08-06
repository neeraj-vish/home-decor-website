package com.homedecor.repository;

import com.homedecor.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BuyerRepository extends JpaRepository<Buyer, Integer> {
    boolean existsByPhoneNumber(String phone);
    @Query("SELECT b FROM Buyer b JOIN FETCH b.user WHERE b.user.email = :email")
    Optional<Buyer> findByUserEmail(@Param("email") String email);

}
