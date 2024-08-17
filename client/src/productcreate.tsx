import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function productCreate(){
    const [Productname, setProductname] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Quantity, setQuantity] = useState(0)
    const [Category, setCategory] = useState("")
    const [SKU, setSKU] = useState("")
    const [Image_upload, setImage_upload] = useState("")
    const navigate = useNavigate()

    const Submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        axios.post("http://localhost:3001/productcreate",{Productname,Description,Price,Quantity,Category,SKU,Image_upload})
        .then(result => {console.log(result)
            navigate('/')})
        .catch(err => console.log(err))
    }
    return (
        <div>
            <div className=" d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={Submit}>
                <h2>Add Product</h2>
                <div className="mb-2">
                    <label htmlFor="">Product name </label>
                    <input type="text" placeholder='Enter Product Name' className='form-control' onChange={(e)=> setProductname(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Description </label>
                    <input type="text" placeholder='Enter Description' className='form-control' onChange={(e)=> setDescription(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Price </label>
                    <input type="number" placeholder='Enter Price' className='form-control' onChange={(e)=> setPrice(parseFloat(e.target.value))}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Quantity </label>
                    <input type="number" placeholder='Enter Quantity' className='form-control' onChange={(e)=> setQuantity(parseFloat(e.target.value))}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Category </label>
                    <input type="text" placeholder='Enter Category' className='form-control' onChange={(e)=> setCategory(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">SKU </label>
                    <input type="text" placeholder='Enter SKU' className='form-control' onChange={(e)=> setSKU(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Image Upload </label>
                    <input type="text" placeholder='Add Image' className='form-control' onChange={(e)=> setImage_upload(e.target.value)}/>
                </div>
                <button className='btn btn-success'>ADD</button>
            </form>
        </div>  
        </div>
       
        </div>
    )

}
export default productCreate;