package com.homedecor.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seller", uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"gst_number"}),
	    @UniqueConstraint(columnNames = {"license_number"})
	})

public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="seller_id")
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column( name="company_name",nullable = false)
    private String companyName;

    @Column(name="company_address",nullable = false)
    private String companyAddress;

    @Column(name="gst_number",nullable = false, unique = true)
    private String gstNumber;

    @Column(name="license_number",nullable = false, unique = true)
    private String licenseNumber;

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
}