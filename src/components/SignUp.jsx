import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Fake from "./fake";
import axios from "axios";
import '../App.css';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [formError, setFormError] = useState("");
    const [focusedField, setFocusedField] = useState("");

    const navigate = useNavigate();

    const glowStyle = (field) => ({
        boxShadow: focusedField === field
            ? '0 0 10px 3px rgba(255, 193, 7, 0.6)'
            : 'none',
        transition: 'box-shadow 0.3s ease',
        borderColor: focusedField === field ? '#FFC107' : '',
    });

    const submit = async (e) => {
        e.preventDefault();

        if (!agreeToTerms) {
            setFormError("Please agree to Terms and Conditions");
            return;
        }

        setLoading(true);
        setError("");
        setFormError("");
        setSuccess("");

        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("email", email);
            formData.append("phone", phone);

            const response = await axios.post(
                "https://Ibtisam.pythonanywhere.com/api/signup",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setLoading(false);

            if (response.data.Success) {
                setSuccess(response.data.Success);
                setUsername("");
                setEmail("");
                setPassword("");
                setPhone("");
                setAgreeToTerms(false);

                setTimeout(() => {
                    navigate('/signin');
                }, 1500);

            } else if (response.data.error) {
                setError(response.data.error);
            }

        } catch (err) {
            setLoading(false);

            setError(
                err.response?.data?.error ||
                err.response?.data?.Message ||
                "Signup failed. Please try again."
            );
        }
    };

    return (
        <div className="signup-container">
            <Fake />
            <br /><br />

            <div
                className="card shadow col-md-6 form p-4 mt-5"
                style={{ textAlign: 'left' }}
            >

                {/* Heading */}
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>

                    <h1
                        style={{
                            color: '#6F4F1F',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            letterSpacing: '0',
                            marginBottom: '4px',
                        }}
                    >
                        Create an Account
                    </h1>

                    <p
                        style={{
                            color: '#6F4F1F',
                            fontWeight: '600',
                            fontSize: '1rem',
                            margin: 0,
                        }}
                    >
                        Join Cacao and enjoy premium chocolate
                    </p>

                </div>

                {loading && (
                    <div className="alert alert-warning">
                        Signing up...
                    </div>
                )}

                {success && (
                    <div className="alert alert-success">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {formError && (
                    <div className="alert alert-danger">
                        {formError}
                    </div>
                )}

                <form onSubmit={submit}>

                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setFocusedField("username")}
                        onBlur={() => setFocusedField("")}
                        style={glowStyle("username")}
                        required
                    />
                    <br />

                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        style={glowStyle("email")}
                        required
                    />
                    <br />

                    <label>Password</label>

                    <div style={{ position: "relative" }}>

                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField("")}
                            style={glowStyle("password")}
                            required
                        />

                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer"
                            }}
                        >
                            {showPassword ? "🙉" : "🙈"}
                        </span>

                    </div>

                    <br />

                    <label>Phone</label>

                    <input
                        type="tel"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField("")}
                        style={glowStyle("phone")}
                        placeholder="254712345678"
                        required
                    />

                    <br />

                    <div className="form-check mb-3">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="agreeToTerms"
                            checked={agreeToTerms}
                            onChange={() => setAgreeToTerms(!agreeToTerms)}
                        />

                        <label
                            className="form-check-label"
                            htmlFor="agreeToTerms"
                        >
                            I agree to Terms and Conditions
                        </label>

                    </div>

                    <button
                        type="submit"
                        className="btn w-100"
                        disabled={loading || !agreeToTerms}
                        style={{
                            backgroundColor: '#6F4F1F',
                            color: 'white',
                            border: 'none',
                            fontWeight: '600',
                            letterSpacing: '1px',
                            transition:
                                'box-shadow 0.3s ease, transform 0.1s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.boxShadow =
                                '0 0 14px 4px rgba(255, 193, 7, 0.7)';
                            e.target.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.boxShadow = 'none';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>

                </form>

                <p className="mt-3">
                    Already have an account?{" "}
                    <Link to="/signin">Sign In</Link>
                </p>

            </div>

            <Footer />
        </div>
    );
};

export default SignUp;