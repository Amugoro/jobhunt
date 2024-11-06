
import React, { useState } from "react";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for toggle visibility

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, user, message } = await login(formData);
    if (success) {
      alert(`Welcome back ${user.fullName}`);
      // Redirect user to their dashboard based on their role
      if (user.role === "jobseeker") {
        navigate.push("/jobseeker-dashboard");
      } else if (user.role === "recruiter") {
        navigate.push("/recruiter-dashboard");
      } else if (user.role === "employer") {
        navigate.push("/employer-dashboard");
      }
    } else {
      setErrorMessage(message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
