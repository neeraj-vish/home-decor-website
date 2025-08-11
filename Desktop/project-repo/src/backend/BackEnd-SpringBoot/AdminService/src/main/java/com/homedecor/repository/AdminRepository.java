package com.homedecor.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.homedecor.entity.Admin;


public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}
