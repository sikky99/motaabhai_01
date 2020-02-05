const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser');

const requireToken = require('../middleware/requireToken');
const Product = mongoose.model('Product')
const router = express.Router();
router.use(requireToken);
const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, process.env.NODE_ENV ==='production'?"/tmp": "./images");
    },
    filename(req, file, callback){
        callback(null, `${file.filename}_${Date.now()}_${file.originalname}`)
    }
})



const upload = multer ({storage: Storage});

router.post("/api/upload", upload.array("photo",3 ),async (req, res)=>{
    console.log('chutney')
    console.log("file", req.files[0].path);
    console.log("body", req.body.userId);
    res.status(200).json({
        message:"succes"
    })
})

router.get('/products', async(req, res) => {
    console.log('get')
    const products = await Product.find({userId: req.user._id})
    res.send(products)
})

router.post('/products', async(req, res) => {
    console.log(req.body)
    const {name} = req.body
    if(!name){
        return  res.status(422).send({error: 'you must provide a name'})
    }

    try {
        const product = new Product({name, userId:req.user._id});
    await product.save();
    // res.send(product)
    } catch(err){
        res.status(422).send({err:err.message})
    }
    
    
})


module.exports = router