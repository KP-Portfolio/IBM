import React, { useState } from "react";
import urlConfig from "../config";
import { useAppContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const { setUserName } = useAppContext(); // Task: Set new name in AppContext

  const [firstName, setFirstName] = useState(sessionStorage.getItem("firstName") || "");
  const [lastName, setLastName] = useState(sessionStorage.getItem("lastName") || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/update`, {
        // Task 1: Set method
        method: "POST",

        // Task 2: Set headers
        headers: {
          "Content-Type": "application/json",
          email: sessionStorage.getItem("email") // backend requires this
        },

        // Task 3: Set body to send user details
        body: JSON.stringify({
          firstName,
          lastName
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Update failed");
        return;
      }

      // Task 4: Set new name in AppContext
      setUserName(`${firstName} ${lastName}`);

      // Task 5: Set user name in session
      sessionStorage.setItem("firstName", firstName);
      sessionStorage.setItem("lastName", lastName);

      setMessage("Profile updated successfully!");

      // Optional: navigate back to main page
      navigate("/app/main");

    } catch (err) {
      console.log("Update error:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Profile</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 mt-3" type="submit">
          Save Changes
        </button>

        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}

export default Profile;