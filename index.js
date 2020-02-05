require('./models/User');
require('./models/Product')
const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT 
const {mogoUrl} = require('./keys')


const authRoutes = require('./routes/authRoutes')
const productsRoute = require('./routes/productRoutes')
const requireToken = require('./middleware/requireToken')

app.use(bodyParser.json())
app.use(authRoutes)
app.use(productsRoute)

mongoose.connect(mogoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    
})

mongoose.connection.on('error',(err)=>{
    
})

app.get('/',requireToken,(req,res)=>{
    res.send({email:req.user.email})
    
    console.log(({email:req.user}))
    
})

    



// 

// app.get('/test',requireToken,(req,res)=>{
//     res.send({name: req.user.name})    
//     // console.log(({name:req.user}))
    
// })

// app.post('/profile',requireToken,(req,res)=>{
//     console.log(req.body)
//     const name = req.body

    
// })




app.listen(PORT,()=>{
    console.log("server running "+PORT)
})