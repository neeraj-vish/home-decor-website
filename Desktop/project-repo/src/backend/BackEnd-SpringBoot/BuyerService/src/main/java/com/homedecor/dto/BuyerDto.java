package com.homedecor.dto;

public class BuyerDto {
	    private Integer buyerId;
	    private String firstName;
	    private String lastName;
	    private String phoneNumber;
	    private String email;
	    private String address; 
    

    public BuyerDto() {
		super();
	}

    public BuyerDto(Integer buyerId, String firstName, String lastName, String phoneNumber, String email, String address) {
        this.buyerId = buyerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
    }

    public Integer getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Integer buyerId) {
        this.buyerId = buyerId;
    }

    public String getFirstName(){
    	return firstName; 
    	}
    public void setFirstName(String firstName) { 
    	this.firstName = firstName;
    	}

    public String getLastName()
    { return lastName; 
    }
    public void setLastName(String lastName)
    { this.lastName = lastName; 
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
