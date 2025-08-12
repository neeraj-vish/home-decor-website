import React from "react";

const HeroCarousel = () => {
  const slides = [
    {
      title: "Premium Textiles",
      subtitle: "Starting ₹299",
      desc: "Upgrade your space with trendy textiles",
      img: "/textiles.jpg",
    },
    {
      title: "Elegant Lighting",
      subtitle: "Starting ₹499",
      desc: "Brighten your home with stunning lights",
      img: "/lighting-banner.jpg",
    },
    {
      title: "Wall Art Collection",
      subtitle: "Starting ₹199",
      desc: "Bring charm with artistic wall decor",
      img: "/wallart-banner.jpg",
    },
    {
      title: "Stylish Furniture",
      subtitle: "Starting ₹999",
      desc: "Upgrade your comfort with modern furniture",
      img: "/furniture.jpg",
    },
  ];

  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner" style={{ height: "calc(100vh - 72px)" }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div
              className="d-flex flex-column justify-content-center align-items-center text-white text-center"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "calc(100vh - 72px)",
                backdropFilter: "brightness(0.6)",
              }}
            >
              <h1 className="display-4 fw-bold">{slide.title}</h1>
              <h4 className="fw-semibold">{slide.subtitle}</h4>
              <p className="lead">{slide.desc}</p>
              <div
                style={{
                  width: "175px",
                  height: "25px",
                  backgroundColor: "#ffcc00",
                  color: "black",
                  fontSize: "14px",
                  textAlign: "center",
                  lineHeight: "25px",
                  borderRadius: "5px",
                  marginTop: "20px",
                  fontWeight: "bold",
                }}
              >
                Shop Now
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Arrows */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroCarousel;