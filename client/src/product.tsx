import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
    _id?: string;
    Productname: string;
    Description: string;
    Price: number;
    Quantity: number;
    Category: string;
    SKU: string;
    Image_upload: string;
}

function Product() {
    const [products, setProduct] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setProduct(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id: string | undefined) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`http://localhost:3001/deleteProduct/${id}`)
                .then(res => {
                    console.log(res);
                    setProduct(products.filter(product => product._id !== id));
                })
                .catch(err => console.log(err));
        }
    };

    const filteredProducts = products.filter(product =>
        product.Productname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.SKU.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="d-flex vh-100 bg-dark-subtle justify-content-center align-items-center">
            <div className="container bg-white rounded p-4">
                <Link to="/create" className='btn btn-success mb-3'>Add Product +</Link>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search by name, category, or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ backgroundColor: '#f5f5f5', borderColor: '#ccc' }}
                />
                <div className="overflow-auto">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>SKU</th>
                                <th>Image Upload</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredProducts.map((Product) => (
                                    <tr key={Product._id}>
                                        <td>{Product.Productname}</td>
                                        <td>{Product.Description}</td>
                                        <td>{Product.Price}</td>
                                        <td>{Product.Quantity}</td>
                                        <td>{Product.Category}</td>
                                        <td>{Product.SKU}</td>
                                        <td>{Product.Image_upload}</td>
                                        <td>
                                            <div className="d-grid gap-2 d-md-flex ">
                                                <Link
                                                    to={`/update/${Product._id}`}
                                                    className="btn btn-success"
                                                    style={{ padding: '.25rem .5rem', fontSize: '.80rem' }}
                                                >
                                                    Update
                                                </Link>
                                                <button
                                                    className="btn btn-danger"
                                                    style={{ padding: '.25rem .5rem', fontSize: '.80rem' }}
                                                    onClick={() => handleDelete(Product._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Product;
