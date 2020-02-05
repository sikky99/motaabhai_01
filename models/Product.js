const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,               
    },
    product:{
        type:String
    },
    imageName:{
        type:String,
        default:"none",
        required:true
    },
    imageData:{
        type:String,
        required:true
    }

   
})



mongoose.model('Product',productSchema);