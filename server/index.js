const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ProductModel = require('./models/Product')
var morgan = require('morgan')
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

mongoose.connect("mongodb://127.0.0.1:27017/product_crud").then(()=>{
    console.log('connected to database')
}).catch(err=>{
    console.log(err)
})

app.get('/',(req,res)=>{
    ProductModel.find({})
    .then(products => res.json(products))
    .catch( err => res.json(err))
})



app.get('/getProduct/:id',(req,res)=>{
    const id = req.params.id;
    ProductModel.findById({_id:id})
    .then(products => res.json(products))
    .catch( err => res.json(err))
})

app.put('/productupdate/:id',(req,res) =>{
    const id = req.params.id;
    console.log('req.params',req.params);
    console.log('req.body',req.body);
    console.log('id',id);
    ProductModel.findByIdAndUpdate(id,
        {Productname: req.body.Productname,
        Description:req.body.Description,
        Price: req.body.Price,
        Quantity:req.body.Quantity,
        Category:req.body.Category,
        SKU: req.body.SKU,
        Image_upload:req.body.Image_upload})
    .then(products => res.json(products))
    .catch( err => {
        console.log(err)
        res.json(err)
    }
    )
})
    

app.delete('/deleteProduct/:id',(req,res) =>{
    const id = req.params.id;
    ProductModel.findByIdAndDelete(id)
    .then(res => {
        console.log(res)
        res.json(res)
       
    }
        )
    .catch(err =>{      
        console.log(err)
        res.json(err)})
})

app.post("/productcreate", upload.single('Image_upload'),(req,res)=>{
    let imageUpload = req.body.Image_upload;
    console.log(req)

    if (req.file) {
        imageUpload = req.file.path;
    }

    ProductModel.create(req.body)
    .then(products => {
        console.log(products)
        res.json(product)})
    .catch( err => res.json(err))
})

app.listen(3001,() =>{
    console.log("Server is Running")
})