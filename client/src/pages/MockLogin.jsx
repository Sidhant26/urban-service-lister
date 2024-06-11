import React, { useState } from "react";
// import "./index.scss";
import "./login.css";

function MockLogin() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loginUser(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const loginData = {
        email: email,
        password: password,
      };

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.status === "ok") 
      {
        localStorage.setItem("token", responseData.user);
        localStorage.setItem("email",responseData.email)
        console.log("test", responseData);
        window.location.assign("/");
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="wrapper">
        <div className="content">
          <header>
            <h1>Welcome back</h1>
          </header>
          <section>
            <form onSubmit={loginUser} className="login-form">
              <div className="input-group">
                <label className="username">Email ID</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="input-group">
                <label className="password">Password</label>
                <input
                  type="password"
                  value={password}
                  name="password"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="input-group">
                <br></br>
                <button type="submit" disabled={loading} className="login-btn">
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            {error && <p>Error: {error}</p>}
          </section>
        </div>
      </div>
    </div>
  );
}

export default MockLogin;
