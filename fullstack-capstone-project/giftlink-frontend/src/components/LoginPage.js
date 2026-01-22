import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {

    // Task: Create state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Task: Create handleLogin function
    const handleLogin = () => {
        console.log("Login clicked");
        console.log({ email, password });
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