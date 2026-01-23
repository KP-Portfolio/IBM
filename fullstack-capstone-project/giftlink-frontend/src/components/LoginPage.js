import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import urlConfig from '../config';
import { useAppContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();
    const bearerToken = sessionStorage.getItem("bearerToken");

    useEffect(() => {
        if (bearerToken) {
            navigate("/app/main");
        }
    }, [bearerToken, navigate]);

    const handleLogin = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message || "Incorrect email or password");
                setPassword(""); // clear password field
                return;
            }

            sessionStorage.setItem("bearerToken", data.authtoken);
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("firstName", data.firstName);
            sessionStorage.setItem("lastName", data.lastName);

            setIsLoggedIn(true);
            navigate("/app/main");

        } catch (err) {
            console.log("Login error:", err.message);
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-card p-4 border rounded">
              <h2 className="text-center mb-4 font-weight-bold">Login</h2>

              {/* Email input */}
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password input */}
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Error message */}
              {errorMessage && (
                <p className="text-danger text-center">{errorMessage}</p>
              )}

              {/* Login button */}
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handleLogin}
              >
                Login
              </button>

              <p className="mt-4 text-center">
                New here? <a href="/app/register" className="text-primary">Register Here</a>
              </p>

            </div>
          </div>
        </div>
      </div>
    );
}

export default LoginPage;