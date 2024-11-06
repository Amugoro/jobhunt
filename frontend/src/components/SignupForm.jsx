
import React, { useState } from "react";
import { signup } from "../utils/api";
import { useNavigate} from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons for toggle visibility

function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker", // Default role
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility toggle
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const { success, user, message } = await signup(formData);
    if (success) {
      alert(`Welcome ${user.fullName}`);
      // Redirect user to their dashboard based on their role
      if (user.role === "jobseeker") {
        navigate("/jobseeker-dashboard");
      } else if (user.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else if (user.role === "employer") {
        navigate("/employer-dashboard");
      }
    } else {
      setErrorMessage(message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

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

        <label>Confirm Password</label>
        <div className="password-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ cursor: "pointer" }}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <label>Role</label>
        <div>
          <input type="radio" name="role" value="jobseeker" checked={formData.role === "jobseeker"} onChange={handleChange} /> Jobseeker
          <input type="radio" name="role" value="recruiter" checked={formData.role === "recruiter"} onChange={handleChange} /> Recruiter
          <input type="radio" name="role" value="employer" checked={formData.role === "employer"} onChange={handleChange} /> Employer
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
