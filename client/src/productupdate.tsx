import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductUpdate() {
    const { id } = useParams();
    const [Productname, setProductname] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [Quantity, setQuantity] = useState(0);
    const [Category, setCategory] = useState("");
    const [SKU, setSKU] = useState("");
    const [Image_upload, setImage_upload] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/getProduct/' + id)
            .then(result => {
                console.log(result);
                setProductname(result.data.Productname);
                setDescription(result.data.Description);
                setPrice(result.data.Price);
                setQuantity(result.data.Quantity);
                setCategory(result.data.Category);
                setSKU(result.data.SKU);
                setImage_upload(result.data.Image_upload);
            })
            .catch(err => console.log(err));
    }, [id]);

    const Update =(e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        axios.put("http://localhost:3001/productupdate/"+id,{Productname,Description,Price,Quantity,Category,SKU,Image_upload})
        .then(result => {console.log(result)
            navigate('/')})
        .catch(err => console.log(err))

    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>Update Product</h2>
                    <div className="mb-2">
                        <label htmlFor="productname">Product name</label>
                        <input
                            type="text"
                            placeholder="Enter Product Name"
                            className="form-control"
                            value={Productname}
                            
                            onChange={(e) => setProductname(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            placeholder="Enter Description"
                            className="form-control"
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            className="form-control"
                            value={Price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            placeholder="Enter Quantity"
                            className="form-control"
                            value={Quantity}
                            onChange={(e) => setQuantity(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            placeholder="Enter Category"
                            className="form-control"
                            value={Category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="sku">SKU</label>
                        <input
                            type="text"
                            placeholder="Enter SKU"
                            className="form-control"
                            value={SKU}
                            onChange={(e) => setSKU(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="image_upload">Image Upload</label>
                        <input
                            type="text"
                            placeholder="Add Image"
                            className="form-control"
                            value={Image_upload}
                            onChange={(e) => setImage_upload(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default ProductUpdate;
