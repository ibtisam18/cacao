import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from './Footer';
import axios from "axios";
import Fake from "./fake";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling

// SignIn component definition
const SignIn = () => {
   // State hooks for input values, loading and error handling
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(""); // To display API or client-side errors
   const [loading, setLoading] = useState(false); // Loading spinner/text state
   const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

   const navigate = useNavigate(); // Hook to programmatically navigate after login

   // Handle form submission
   const submit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      setLoading(true);  // Set loading to true
      setError("");      // Clear previous errors

      try {
         // Create form data and append fields
         const formData = new FormData();
         formData.append("email", email);
         formData.append("password", password);

         // Send POST request to login endpoint
         const response = await axios.post("https://Ibtisam.pythonanywhere.com/api/signin", formData);
         setLoading(false); // Stop loading once response is received

         // If login is successful
         if (response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data locally
            navigate("/main"); // Redirect to main page
         } else {
            // Handle server-side error message
            setError(response.data.Message || "Unknown error occurred");
         }
      } catch (error) {
         setLoading(false); // Stop loading if request fails
         setError(error.response?.data?.Message || "An error occurred. Please try again."); // Show error message
      }
   };

   return (
      <div className="row justify-content-center mt-5">
         <Fake /> {/* Optional decorative/banner component */}
         
         {/* Sign-in form card */}
         <div className="card shadow col-md-6 p-4 form mt-5">
            <h1 className="">Sign In</h1>
            <label className="typing-text">Welcome back to Cacao!</label>

            {/* Show error message if any */}
            {error && <div className="alert alert-danger mt-2">{error}</div>}

            {/* Show loading message while signing in */}
            {loading && <div className="alert alert-info mt-2">Signing you in...</div>}

            {/* Sign-in form */}
            <form onSubmit={submit} className="form2 mt-3">
               <fieldset>
                  {/* Email input field */}
                  <label className="label">Email</label>
                  <input
                     type="email"
                     placeholder="your@email.com"
                     className="form-control p-2"
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  /><br />

                  {/* Password input field with visibility toggle */}
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
                     {/* Eye emoji to toggle password visibility */}
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
                  </div><br />

                  {/* Optional "Remember me" checkbox */}
                  <div className="form-check d-flex align-items-center mb-3">
                     <input
                        type="checkbox"
                        className="form-check-input me-2"
                        id="rememberMe"
                     />
                     <label className="form-check-label remember-me-text" htmlFor="rememberMe">
                        Remember me
                     </label>
                  </div>

                  {/* Submit button */}
                  <input
                     type="submit"
                     value={loading ? "Signing In..." : "Sign In"}
                     className="button text-dark"
                     disabled={loading} // Disable while loading
                  /><br />

                  {/* Link to signup page */}
                  <p className="text-dark" id="label">
                     Don't have an account? <Link to='/signup'>Sign Up</Link>
                  </p>
               </fieldset>
            </form>
         </div>

         {/* Footer at the bottom */}
         <Footer />
      </div>
   );
};

export default SignIn;
