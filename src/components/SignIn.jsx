import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from './Footer';
import axios from "axios";
import Fake from "./fake";
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
   const [email, setEmail]               = useState("");
   const [password, setPassword]         = useState("");
   const [error, setError]               = useState("");
   const [loading, setLoading]           = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();

   const submit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
         // Send as FormData to match Flask request.form
         const formData = new FormData();
         formData.append("email", email);
         formData.append("password", password);

         const response = await axios.post(
            "https://Ibtisam.pythonanywhere.com/api/signin",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
         );

         setLoading(false);
         console.log("Signin response:", response.data);

         if (response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/main");
         } else {
            setError(response.data.Message || "Login failed. Check your credentials.");
         }

      } catch (err) {
         setLoading(false);
         console.log("Signin error:", err.response?.data);
         setError(
            err.response?.data?.error ||
            err.response?.data?.Message ||
            "An error occurred. Please try again."
         );
      }
   };

   return (
      <div className="row justify-content-center mt-5">
         <Fake />

         <div className="card shadow col-md-6 p-4 form mt-5">
            <h1>Sign In</h1>
            <label>Welcome back to Cacao!</label>

            {error   && <div className="alert alert-danger mt-2">{error}</div>}
            {loading && <div className="alert alert-info mt-2">Signing you in...</div>}

            <form onSubmit={submit} className="form2 mt-3">

               {/* EMAIL */}
               <label>Email</label>
               <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
               <br />

               {/* PASSWORD */}
               <label>Password</label>
               <div style={{ position: "relative" }}>
                  <input
                     type={showPassword ? "text" : "password"}
                     className="form-control"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
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

               {/* REMEMBER ME */}
               <div className="form-check mb-3">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">
                     Remember me
                  </label>
               </div>

               {/* SUBMIT */}
               <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
               >
                  {loading ? "Signing In..." : "Sign In"}
               </button>

               <p className="mt-3">
                  Don't have an account? <Link to="/signup">Sign Up</Link>
               </p>
            </form>
         </div>

         <Footer />
      </div>
   );
};

export default SignIn;