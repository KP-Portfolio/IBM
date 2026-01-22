import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailsPage.css";

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gift, setGift] = useState(null);
  const [error, setError] = useState("");

  // Step 1: Check authentication (simple localStorage check for this lab)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/app/login");
    }
  }, [navigate]);

  // Step 2: Fetch gift details
  useEffect(() => {
    async function fetchGift() {
      try {
        const response = await fetch(`/api/gifts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch gift details");
        }
        const data = await response.json();
        setGift(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchGift();
  }, [id]);

  // Step 3: Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Step 4: Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  if (error) {
    return (
      <div className="details-container">
        <p className="error-message">{error}</p>
        <button className="btn btn-secondary" onClick={handleBack}>
          Go Back
        </button>
      </div>
    );
  }

  if (!gift) {
    return <p className="loading-text">Loading gift details...</p>;
  }

  return (
    <div className="details-container">
      <button className="btn btn-secondary mb-3" onClick={handleBack}>
        ← Back
      </button>

      <div className="gift-details-card">
        <img
          src={gift.image_url || "https://via.placeholder.com/300?text=No+Image"}
          alt={gift.name}
          className="gift-details-image"
        />

        <h2>{gift.name}</h2>
        <p><strong>Category:</strong> {gift.category}</p>
        <p><strong>Condition:</strong> {gift.condition}</p>
        <p><strong>Age (years):</strong> {gift.age_years}</p>
        <p><strong>Description:</strong> {gift.description}</p>

        {/* Step 6: Comments section */}
        <div className="comments-section mt-4">
          <h4>Comments</h4>

          {gift.comments && gift.comments.length > 0 ? (
            <ul className="comment-list">
              {gift.comments.map((comment, index) => (
                <li key={index} className="comment-item">
                  <strong>{comment.user}</strong>: {comment.text}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;