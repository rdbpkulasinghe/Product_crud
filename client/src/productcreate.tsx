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
    const [Image_upload, setImage_upload] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const navigate = useNavigate()

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!Productname) newErrors.Productname = "Product name is required";
        if (!Description) newErrors.Description = "Description is required";
        if (Price <= 0) newErrors.Price = "Price is required ";
        if (Quantity < 0 ) newErrors.Quantity = "Quantity is required";
        if (!Category) newErrors.Category = "Category is required";
        if (!SKU) newErrors.SKU = "SKU is required";
        if (!Image_upload) newErrors.Image_upload = "Image upload is required";


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files[0])
            setImage_upload(event.target.files[0]);
        }
    };

    const Submit = (e: { preventDefault: () => void; }) => {
        console.log(Image_upload)
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append("Productname", Productname);
            formData.append("Description", Description);
            formData.append("Price", Price.toString());
            formData.append("Quantity", Quantity.toString());
            formData.append("Category", Category);
            formData.append("SKU", SKU);
            if (Image_upload) formData.append("Image_upload", Image_upload);
        axios.post("http://localhost:3001/productcreate",formData)
        .then(result => {console.log(result)
            navigate('/')})
        .catch(err => console.log(err))
        }
    }
    return (
        <div>
            <div className=" d-flex vh-100 bg-dark-subtle justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={Submit}>
                <h2>Add Product</h2>
                <div className="mb-2">
                    <label htmlFor="">Product name </label>
                    <input type="text" placeholder='Enter Product Name' className='form-control' onChange={(e)=> setProductname(e.target.value)}/>
                    {errors.Productname && <span className="text-danger">{errors.Productname}</span>}
                </div>
                <div className="mb-2">
                    <label htmlFor="">Description </label>
                    <input type="text" placeholder='Enter Description' className='form-control' onChange={(e)=> setDescription(e.target.value)}/>
                    {errors.Description && <span className="text-danger">{errors.Description}</span>}

                </div>
                <div className="mb-2">
                    <label htmlFor="">Price </label>
                    <input type="number" placeholder='Enter Price' className='form-control' onChange={(e)=> setPrice(parseFloat(e.target.value))}/>
                    {errors.Price && <span className="text-danger">{errors.Price}</span>}

                </div>
                <div className="mb-2">
                    <label htmlFor="">Quantity </label>
                    <input type="number" placeholder='Enter Quantity' className='form-control' onChange={(e)=> setQuantity(parseFloat(e.target.value))}/>
                    {errors.Quantity && <span className="text-danger">{errors.Quantity}</span>}

                </div>
                <div className="mb-2">
                    <label htmlFor="">Category </label>
                    <input type="text" placeholder='Enter Category' className='form-control' onChange={(e)=> setCategory(e.target.value)}/>
                    {errors.Category && <span className="text-danger">{errors.Category}</span>}

                </div>
                <div className="mb-2">
                    <label htmlFor="">SKU </label>
                    <input type="text" placeholder='Enter SKU' className='form-control' onChange={(e)=> setSKU(e.target.value)}/>
                    {errors.SKU && <span className="text-danger">{errors.SKU}</span>}

                </div>
                <div className="mb-2">
                            <label htmlFor="Image_upload">Image Upload</label>
                            <input
                                type="file"
                                id="Image_upload"
                                className='form-control'
                                onChange={handleChange}
                            />
                            {errors.Image_upload && <span className="text-danger">{errors.Image_upload}</span>}
                        </div>
                <button className='btn btn-success'>ADD</button>
            </form>
        </div>  
        </div>
       
        </div>
    )

}
export default productCreate;