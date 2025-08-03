package com.homedecor.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "mode")
public class Mode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mode_id")
    private Integer modeId;

    @Column(name = "mode_name", nullable = false, length = 30)
    private String modeName;

    public Mode() {}

    // Getters and setters

    public Integer getModeId() {
        return modeId;
    }

    public void setModeId(Integer modeId) {
        this.modeId = modeId;
    }

    public String getModeName() {
        return modeName;
    }

    public void setModeName(String modeName) {
        this.modeName = modeName;
    }
}
