package com.homedecor.controllers;
import com.homedecor.dto.BuyerDto;
import java.util.List;
import com.homedecor.entity.Buyer;
import com.homedecor.repository.BuyerRepository;
import com.homedecor.services.BuyerService;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buyers")

public class BuyerController {

    @Autowired
    private BuyerService buyerService;
    @Autowired
    private BuyerRepository buyerRepository;


    // Register buyer
    @PostMapping("/register")
    public ResponseEntity<?> registerBuyer(@RequestBody Buyer buyer) {
        try {
            Buyer createdBuyer = buyerService.registerBuyer(buyer);
            return ResponseEntity.ok(createdBuyer);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Server error: " + e.getMessage());
        }
    }

    // Check if email exists
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(buyerService.emailExists(email));
    }

    // Check if phone exists
    @GetMapping("/check-phone")
    public ResponseEntity<Boolean> checkPhone(@RequestParam String phone) {
        return ResponseEntity.ok(buyerService.phoneExists(phone));
    }

    //Get buyer by email 
    @GetMapping("/email/{email}")
    public ResponseEntity<BuyerDto> getBuyerByEmail(@PathVariable String email) {
        Buyer buyer = buyerService.getBuyerByEmail(email);

        BuyerDto dto = new BuyerDto(
            buyer.getBuyerId(),
            buyer.getFirstName(),
            buyer.getLastName(),
            buyer.getPhoneNumber(),
            buyer.getUser().getEmail(),
            buyer.getAddress()
        );

        return ResponseEntity.ok(dto);
    }
    
    
    //Update the buyer by id
    @PutMapping("/update/{id}")
    public ResponseEntity<Buyer> updateBuyer(@PathVariable Integer id, @RequestBody Buyer updatedBuyer) {
        Buyer buyer = buyerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        buyer.setFirstName(updatedBuyer.getFirstName());
        buyer.setLastName(updatedBuyer.getLastName());
        buyer.setPhoneNumber(updatedBuyer.getPhoneNumber());
        buyer.setAddress(updatedBuyer.getAddress());

        Buyer savedBuyer = buyerRepository.save(buyer);

        return ResponseEntity.ok(savedBuyer);
    }
    
    
    //Get all Buyer List
    @GetMapping("/getAll")
    public ResponseEntity<List<BuyerDto>> getAllBuyers() {
        List<BuyerDto> buyers = buyerService.getAllBuyers()
            .stream()
            .map(buyer -> new BuyerDto(
                buyer.getBuyerId(), 
                buyer.getFirstName(), 
                buyer.getLastName(), 
                buyer.getPhoneNumber(), 
                buyer.getUser().getEmail(), 
                buyer.getAddress()))
            .toList();

        return ResponseEntity.ok(buyers);
    }
    
    
    
    @GetMapping("/{id}")
    public ResponseEntity<Buyer> getBuyerById(@PathVariable Integer id) {
        Buyer buyer = buyerService.findBuyerById(id);
        if (buyer != null) {
            return ResponseEntity.ok(buyer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    
    
    //Delete buyer by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBuyer(@PathVariable Integer id) {
        buyerService.deleteBuyer(id);
        return ResponseEntity.noContent().build();
    }

    
    


    
}
