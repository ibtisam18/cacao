import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import NavBar from "./NavBar";
const AddProduct = () => {
    const [product_name, setProduct_name] = useState("");
    const [product_description, setProduct_description] = useState("");
    const [product_cost, setProduct_cost] = useState("");
    const [product_photo, setProduct_photo] = useState("");

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const submit = async (e) => {
        e.preventDefault();  // Prevent page reload on form submission
        setLoading("Please wait...");

        try {
            // Create FormData object
            const formData = new FormData();
            formData.append("product_name", product_name);  // Fixed the typo here
            formData.append("product_description", product_description);
            formData.append("product_cost", product_cost);
            formData.append("product_photo", product_photo);

            // Post the data to the backend API
            const response = await axios.post("https://ibtisam.pythonanywhere.com/api/product_details", formData);

            setLoading("");  // Clear loading state
            setSuccess(response.data.success);  // Show success message

            // Clear the form inputs after successful submission
            setProduct_name("");
            setProduct_description("");
            setProduct_cost("");
            setProduct_photo("");

        } catch (error) {
            setLoading("");  // Clear loading state
            setError(error.message);  // Show error message
        }
    };
    

    return (
        <div className="row justify-content-center mt-5 ">
            <NavBar/>
            <div className="card shadow col-md-10 p-4 mt-5 ">
                <h1>Add Product</h1>
                {loading && <div className="alert alert-warning">{loading}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={submit}>
                    <fieldset>
                        <label htmlFor="product_name" className="text">Product Name</label><br />
                        <input
                            type="text"
                            className="form-control"
                            required
                            id="product_name"
                            value={product_name}
                            onChange={(e) => setProduct_name(e.target.value)}
                        /><br />

                        <label htmlFor="product_description" className="mt-3">Description</label><br />
                        <textarea
                            className="form-control"
                            required
                            id="product_description"
                            value={product_description}
                            onChange={(e) => setProduct_description(e.target.value)}
                        ></textarea><br />

                        <label htmlFor="product_cost" className="mt-3">Cost (Ksh)</label><br />
                        <input
                            type="number"
                            className="form-control"
                            required
                            id="product_cost"
                            value={product_cost}
                            onChange={(e) => setProduct_cost(e.target.value)}
                        /><br />

                        <label htmlFor="product_photo" className="mt-3">Product Photo</label><br />
                        <input
                            type="file"
                            className="form-control"
                            required
                            accept="image/*"
                            id="product_photo"
                            onChange={(e) => setProduct_photo(e.target.files[0])}
                        /><br />

                        <button className="bg-primary text-light form-control" type="submit">
                            Add Product
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
