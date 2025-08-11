package com.homedecor.dto;

import com.homedecor.entity.Seller;

public class SellerDto {
	   private Integer sellerId;
	    private String companyName;
	    private String companyAddress;
	    private String gstNumber;
	    private String licenseNumber;
	    private String email;
	    
	    
	    public SellerDto() {
	        
	    }

 
    public SellerDto( Integer sellerId, String companyName, String companyAddress,
            String gstNumber, String licenseNumber, String email) {
          this.sellerId = sellerId;
          this.companyName = companyName;
          this.companyAddress = companyAddress;
          this.gstNumber = gstNumber;
          this.licenseNumber = licenseNumber;
          this.email = email;
          
       }
    
    
    public SellerDto(Seller seller) {
        this.sellerId = seller.getSellerId();
        this.companyName = seller.getCompanyName();
        this.companyAddress = seller.getCompanyAddress();
        this.gstNumber = seller.getGstNumber();
        this.licenseNumber = seller.getLicenseNumber();
        this.email = seller.getUser().getEmail(); 
        
    }
    

    // Getters and setters
    public Integer getSellerId() {
        return sellerId;
    }

    public void setSellerId(Integer sellerId) {
        this.sellerId = sellerId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    public String getGstNumber() {
        return gstNumber;
    }

    public void setGstNumber(String gstNumber) {
        this.gstNumber = gstNumber;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
