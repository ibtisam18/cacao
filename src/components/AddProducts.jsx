import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import NavBar from "./NavBar";

const AddProduct = () => {
    const [product_name, setProduct_name]               = useState("");
    const [product_description, setProduct_description] = useState("");
    const [product_cost, setProduct_cost]               = useState("");
    const [product_photo, setProduct_photo]             = useState(null);

    const [success, setSuccess] = useState("");
    const [error, setError]     = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        // Validate photo selected
        if (!product_photo) {
            setError("Please select a product photo.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const formData = new FormData();
            formData.append("product_name",        product_name);
            formData.append("product_description", product_description);
            formData.append("product_cost",        product_cost);
            formData.append("product_photo",       product_photo);  // ✅ actual File object

            const response = await axios.post(
                "https://Ibtisam.pythonanywhere.com/api/product_details",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }  // ✅ explicit header
            );

            setLoading(false);

            // ✅ FIXED: backend returns "Success" (capital S)
            if (response.data.Success) {
                setSuccess(response.data.Success);

                // Clear form
                setProduct_name("");
                setProduct_description("");
                setProduct_cost("");
                setProduct_photo(null);

                // Reset file input manually
                document.getElementById("product_photo").value = "";

            } else if (response.data.error) {
                setError(response.data.error);
            }

        } catch (err) {
            setLoading(false);
            console.log("Upload error:", err.response?.data);
            setError(
                err.response?.data?.error ||
                "Failed to add product. Please try again."
            );
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <NavBar />

            <div className="card shadow col-md-10 p-4 mt-5">
                <h1>Add Product</h1>

                {loading && <div className="alert alert-warning">Please wait...</div>}
                {success && <div className="alert alert-success">{success}</div>}
                {error   && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={submit}>
                    <fieldset>
                        {/* PRODUCT NAME */}
                        <label htmlFor="product_name">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="product_name"
                            value={product_name}
                            onChange={(e) => setProduct_name(e.target.value)}
                            required
                        />
                        <br />

                        {/* DESCRIPTION */}
                        <label htmlFor="product_description" className="mt-3">Description</label>
                        <textarea
                            className="form-control"
                            id="product_description"
                            value={product_description}
                            onChange={(e) => setProduct_description(e.target.value)}
                            rows={3}
                            required
                        />
                        <br />

                        {/* COST */}
                        <label htmlFor="product_cost" className="mt-3">Cost (Ksh)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="product_cost"
                            value={product_cost}
                            onChange={(e) => setProduct_cost(e.target.value)}
                            min="1"
                            required
                        />
                        <br />

                        {/* PHOTO */}
                        <label htmlFor="product_photo" className="mt-3">Product Photo</label>
                        <input
                            type="file"
                            className="form-control"
                            id="product_photo"
                            accept="image/*"
                            onChange={(e) => setProduct_photo(e.target.files[0])}
                            required
                        />
                        <br />

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Uploading..." : "Add Product"}
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;