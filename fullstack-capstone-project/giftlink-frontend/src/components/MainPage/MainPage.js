import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();

  // Task 1: Fetch gifts
  useEffect(() => {
    async function fetchGifts() {
      try {
        const response = await fetch("/api/gifts");
        const data = await response.json();
        setGifts(data);
      } catch (error) {
        console.error("Error fetching gifts:", error);
      }
    }

    fetchGifts();
  }, []);

  // Task 3: Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown date";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Placeholder image
  const placeholder = "https://via.placeholder.com/150?text=No+Image";

  return (
    <div className="main-page">
      <h1>Available Gifts</h1>

      <div className="gift-list">
        {gifts.map((gift) => (
          <div
            key={gift._id}
            className="gift-card"
            onClick={() => navigate(`/details/${gift._id}`)} // Task 2: Navigate to details page
            style={{ cursor: "pointer" }}
          >
            {/* Task 4: Display gift image or placeholder */}
            <img
              src={gift.image_url || placeholder}
              alt={gift.name}
              className="gift-image"
            />

            {/* Task 5: Display gift name */}
            <h3>{gift.name}</h3>

            {/* Task 6: Display formatted date */}
            <p className="gift-date">Added: {formatTimestamp(gift.timestamp)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;