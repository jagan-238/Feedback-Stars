import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const FeedbackStars = ({ numberOfStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);


  useEffect(() => {
    const savedRating = localStorage.getItem("rating");
    if (savedRating) setRating(Number(savedRating));
  }, []);


  useEffect(() => {
    localStorage.setItem("rating", rating);
  }, [rating]);

  const handleClick = (value) => {
    setRating(value);
    if (onRatingChange) onRatingChange(value);
  };

  const handleClear = () => {
    setRating(0);
    if (onRatingChange) onRatingChange(0);
  };

  return (
    <div style={{ display: "inline-block", marginTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
        {Array.from({ length: numberOfStars }, (_, i) => {
          const starValue = i + 1;
          return (
            <FaStar
              key={i}
              size={40}
              color={
                hoverRating >= starValue || rating >= starValue ? "gold" : "gray"
              }
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleClick(starValue)}
              style={{ cursor: "pointer", transition: "color 0.2s" }}
            />
          );
        })}
      </div>
      <p style={{ marginTop: "10px", fontSize: "18px" }}>
        {rating ? `You rated: ${rating}/${numberOfStars}` : "No rating selected"}
      </p>
      <button
        onClick={handleClear}
        style={{
          marginTop: "10px",
          padding: "5px 15px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Clear Rating
      </button>
    </div>
  );
};

export default FeedbackStars;
