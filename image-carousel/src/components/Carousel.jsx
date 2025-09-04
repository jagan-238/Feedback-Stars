import { useState, useEffect, useRef } from "react";

const Carousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [images]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="carousel-container"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      style={{
        position: "relative",
        width: "80%",
        maxWidth: "700px",
        margin: "50px auto",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <div
        className="carousel-slides"
        style={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            style={{
              width: "100%",      
              height: "400px",    
              flexShrink: 0,
              objectFit: "cover",
            }}
          />
        ))}
      </div>

      <button
        onClick={goToPrevious}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          border: "none",
          color: "white",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "50%",
        }}
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          border: "none",
          color: "white",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "50%",
        }}
      >
        &#10095;
      </button>

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              margin: "0 5px",
              background:
                index === currentIndex ? "white" : "rgba(255,255,255,0.5)",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
