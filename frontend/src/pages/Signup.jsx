import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signup } from '../utils/api'; // Mock API call function
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, password, confirmPassword } = formData;
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        try {
            const response = await signup({ fullName, email, password });
            if (response.success) {
                history.push(`/profile?message=Welcome, ${fullName}`);
            } else {
                setError(response.message || "Signup failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="fullName" 
                    placeholder="Full Name" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    required 
                />
                <div className="password-field">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        required 
                    />
                    <span onClick={handleTogglePassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="confirmPassword" 
                    placeholder="Confirm Password" 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
