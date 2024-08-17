import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
    _id?:string;
    Productname: string;
    Description: string;
    Price: number;
    Quantity: number;
    Category: string;
    SKU: string;
    Image_upload: string;
}

function Product(){
    const[products,setProduct] = useState<Product[]>([])
    useEffect(()=>{
        axios.get('http://localhost:3001')
        .then(result => setProduct(result.data))
        .catch(err => console.log(err))
    },[])

    const handleDelete = (id: string | undefined) => {
        axios.delete(`http://localhost:3001/deleteProduct/${id}`)
        .then (res => {
            console.log(res)
            setProduct(products.filter(product => product._id !== id));
        })
        .catch(errr => console.log(errr))
    }
    
    return (
        <div className=" d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
               < Link to="/create" className='btn btn-success'>Add Product +</Link>
                <table className="table">
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
                        products.map((Product) => {
                            return <tr>
                                <td>{Product.Productname}</td>
                                <td>{Product.Description}</td>
                                <td>{Product.Price}</td>
                                <td>{Product.Quantity}</td>
                                <td>{Product.Category}</td>
                                <td>{Product.SKU}</td>
                                <td>{Product.Image_upload }</td>
                                <td>           
                                < Link to={`/update/${Product._id}`} className='btn btn-success'>Update</Link>

                                <button className='btn btn-danger' onClick={(e) => handleDelete(Product._id)}>Delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
                </table>
            </div>  
        </div>
    )

}
export default Product;