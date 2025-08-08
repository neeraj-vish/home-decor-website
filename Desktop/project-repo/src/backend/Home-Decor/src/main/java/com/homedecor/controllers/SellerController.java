package com.homedecor.controllers;

import com.homedecor.dto.SellerDto;
import com.homedecor.entity.Seller;
import com.homedecor.repository.SellerRepository;
import com.homedecor.services.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/sellers")

public class SellerController {

    @Autowired
    private SellerService sellerService;
    
    @Autowired
    private SellerRepository sellerRepository;

    @PostMapping("/create")
    public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) {
        Seller savedSeller = sellerService.saveSeller(seller);
        return ResponseEntity.ok(savedSeller);
    }

    @GetMapping("/getAllSellers")
    public ResponseEntity<List<Seller>> getAllSellers() {
        return ResponseEntity.ok(sellerService.getAllSellers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Integer id) {
        Optional<Seller> seller = sellerService.getSellerById(id);
        if (seller.isPresent()) {
            return ResponseEntity.ok(seller.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Integer id) {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

    //Insert this new method below
    @GetMapping("/exists")
    public ResponseEntity<Map<String, Boolean>> checkFieldExists(
        @RequestParam(required = false) String email,
        @RequestParam(required = false) String gstNumber,
        @RequestParam(required = false) String licenseNumber
    ) {
        boolean exists = false;
        if (email != null) exists = sellerService.existsByEmail(email);
        if (gstNumber != null) exists = sellerService.existsByGstNumber(gstNumber);
        if (licenseNumber != null) exists = sellerService.existsByLicenseNumber(licenseNumber);

        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }
    
    
    @GetMapping("/email/{email}")
    public ResponseEntity<SellerDto> getSellerByEmail(@PathVariable String email) {
        Seller seller = sellerRepository.findByUserEmail(email);
        if (seller == null) {
            return ResponseEntity.notFound().build();
        }

        SellerDto dto = new SellerDto(
            seller.getSellerId(),
            seller.getCompanyName(),
            seller.getCompanyAddress(),
            seller.getGstNumber(),
            seller.getLicenseNumber(),
            seller.getUser().getEmail()
        );

        return ResponseEntity.ok(dto);
    }



    @PutMapping("/update/{id}")
    public ResponseEntity<SellerDto> updateSeller(
        @PathVariable Integer id,
        @RequestBody SellerDto updatedSeller
    ) {
        SellerDto sellerDto = sellerService.updateSeller(id, updatedSeller);
        return ResponseEntity.ok(sellerDto);
    }


}
