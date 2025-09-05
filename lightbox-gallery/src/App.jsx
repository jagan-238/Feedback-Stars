import React, { useState } from "react";
import "./App.css";

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600&auto=format&fit=crop&q=80", alt: "City Skyline" },
  { id: 2, src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80", alt: "Coffee and Laptop" },
  { id: 3, src: "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?w=600&auto=format&fit=crop&q=80", alt: "Delicious Burger" },
  { id: 4, src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=600&auto=format&fit=crop&q=80", alt: "Modern Architecture" },
  { id: 5, src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80", alt: "Technology Chips" },
  { id: 6, src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80", alt: "Coding on Laptop" },
  { id: 7, src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=600&auto=format&fit=crop&q=80", alt: "Books on Shelf" },
  { id: 8, src: "https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=600&auto=format&fit=crop&q=80", alt: "Travel Map" },
  { id: 9, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80", alt: "Smiling Dog" },
];

export default function App() {
  const [selected, setSelected] = useState(null);

  const closeModal = (e) => {
    if (e.target.className === "modal") setSelected(null);
  };

  return (
    <div className="gallery-container">
      <h1>Lightbox Gallery</h1>
      <div className="grid">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>

      {selected && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={selected.src} alt={selected.alt} className="main-image" />
          </div>
        </div>
      )}
    </div>
  );
}