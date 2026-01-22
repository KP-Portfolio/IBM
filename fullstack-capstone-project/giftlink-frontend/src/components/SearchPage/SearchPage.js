import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

function SearchPage() {
  // Task 1: Define state variables
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [age, setAge] = useState(0);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Dropdown options (could also be fetched dynamically)
  const categories = ["Toys", "Electronics", "Clothing", "Books", "Other"];
  const conditions = ["New", "Good", "Fair", "Poor"];

  // Task 2: Fetch search results
  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();

      if (query) params.append("name", query);
      if (category) params.append("category", category);
      if (condition) params.append("condition", condition);
      if (age > 0) params.append("age_years", age);

      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      setResults(data);
      setError("");
    } catch (err) {
      setError("Unable to fetch search results");
    }
  };

  return (
    <div className="search-container">
      <h2 className="mb-4">Search Gifts</h2>

      {/* Task 7: Text input field */}
      <div className="form-group mb-3">
        <label>Search by Name</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Task 3: Category dropdown */}
      <div className="form-group mb-3">
        <label>Category</label>
        <select
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Task 3: Condition dropdown */}
      <div className="form-group mb-3">
        <label>Condition</label>
        <select
          className="form-control"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">All</option>
          {conditions.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Task 4: Age slider */}
      <div className="form-group mb-3">
        <label>Maximum Age (years): {age}</label>
        <input
          type="range"
          min="0"
          max="20"
          value={age}
          className="form-range"
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      {/* Task 8: Search button */}
      <button className="btn btn-primary w-100 mb-4" onClick={handleSearch}>
        Search
      </button>

      {/* Error message */}
      {error && <p className="text-danger">{error}</p>}

      {/* Task 5: Display results */}
      <div className="results-section">
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((gift) => (
            <div
              key={gift._id}
              className="result-card"
              onClick={() => navigate(`/details/${gift._id}`)} // Task 6
            >
              <img
                src={gift.image_url || "https://via.placeholder.com/120?text=No+Image"}
                alt={gift.name}
                className="result-image"
              />
              <div>
                <h4>{gift.name}</h4>
                <p>Category: {gift.category}</p>
                <p>Condition: {gift.condition}</p>
                <p>Age: {gift.age_years} years</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchPage;