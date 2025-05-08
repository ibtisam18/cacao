import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Fake from "./fake";
import axios from "axios";
import '../App.css';

// Signup component definition
const SignUp = () => {
    // State hooks to manage form inputs and UI feedback
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [success, setSuccess] = useState(""); // Success message
    const [error, setError] = useState(""); // Error message from API
    const [loading, setLoading] = useState(false); // Loading state during API call
    const [agreeToTerms, setAgreeToTerms] = useState(false); // Checkbox state for agreeing to terms
    const [formError, setFormError] = useState(""); // Local form validation error message

    const navigate = useNavigate(); // Hook to programmatically navigate

    // Form submit handler
    const submit = async (e) => {
        e.preventDefault();

        // If terms are not agreed, show error and prevent submission
        if (!agreeToTerms) {
            setFormError("Please agree to our Terms and Conditions before continuing 😊");
            return;
        }

        setLoading(true); // Start loading
        setError(""); // Clear previous errors
        setFormError(""); // Clear form validation error

        try {
            // Create FormData and append form fields
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("email", email);
            formData.append("phone", phone);

            // Send POST request to signup endpoint
            const response = await axios.post("https://Ibtisam.pythonanywhere.com/api/signup", formData);

            setLoading(false); // Stop loading
            setSuccess(response.data.message); // Show success message

            // Clear form fields
            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");

            // Redirect to signin after 1 second
            setTimeout(() => {
                navigate('/signin');
            }, 1000);
        } catch (error) {
            setLoading(false); // Stop loading
            // Show error from server or fallback error message
            setError(error.response?.data?.Message || "An error occurred.");
        }
    };

    // Toggle the checkbox state
    const handleCheckboxChange = () => {
        setAgreeToTerms(!agreeToTerms);
    };

    return (
        <div className="signup-container">
            <Fake /> {/* Possibly a decorative or banner component */}
            <br /><br />

            {/* Signup form card */}
            <div className="card shadow col-md-6 form p-4 mt-5">
                <h1>Create an Account</h1>
                <label>Join Cacao and enjoy premium chocolate</label>

                {/* Feedback messages */}
                {loading && <div className="alert alert-warning">{loading}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                {formError && <div className="alert alert-danger">{formError}</div>}

                {/* Signup form */}
                <form onSubmit={submit}>
                    {/* Username field */}
                    <label className="label mt-4">Username</label>
                    <input 
                        type="text" 
                        placeholder="Hayati Ali" 
                        required 
                        className="form-control" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    /> 
                    <br /><br />
                    
                    {/* Email field */}
                    <label className="label">Email</label>
                    <input 
                        type="email" 
                        placeholder="your@gmail.com"  
                        required 
                        className="form-control" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    /> 
                    <br /><br />
                    
                    {/* Password field with visibility toggle */}
                    <label className="label">Password</label>
                    <div className="password-container" style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="******"
                            className="form-control"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Toggle password visibility emoji */}
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                fontSize: "1.5em",
                            }}
                        >
                            {showPassword ? "🙉" : "🙈"}
                        </span>
                    </div>
                    <br /><br />

                    {/* Phone field */}
                    <label className="label">Phone</label>                    
                    <input 
                        type="tel" 
                        placeholder="254*********"  
                        required 
                        className="form-control" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} 
                    /> 
                    <br />

                    {/* Checkbox for agreeing to terms */}
                    <div className="form-check d-flex align-items-center mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            id="rememberMe"
                            checked={agreeToTerms}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label remember-me-text" htmlFor="rememberMe">
                            I agree to the Terms of Service and Privacy Policy
                        </label>
                    </div><br />

                    {/* Submit button */}
                    <input
                        type="submit"
                        value={loading ? "Signing Up..." : "Sign Up"}
                        className="button text-dark"
                        disabled={loading || !agreeToTerms} // Disable if loading or terms not agreed
                    /><br />
                </form>

                {/* Navigation link to signin */}
                <p className="text-dark" id="label">
                    Already have an account? <Link to="/signin">Sign In</Link>
                </p>
            </div>

            {/* Footer component */}
            <Footer />
        </div>
    );
};

export default SignUp;
