const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    Productname: {
        type:String,
        
    },
    Description: {
        type:String,
        
    },
    Price: {
        type:Number,
        
    },
    Quantity: {
        type:Number,
        
    },
    Category: {
        type:String,
        
    },
    SKU: {
        type:String,
        
    },
    Image_upload: {
        type:String,
        
    },
    

})

const ProductModel = mongoose.model("product",ProductSchema)
module.exports = ProductModel