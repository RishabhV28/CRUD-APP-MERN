
const express = require("express")
const app= express()
const mongoose=require('mongoose')
const Product=require('./models/product.models.js')

app.use(express.json())

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
}
)

app.get("/",(req,res)=>{
    res.send("Hello World 5")
})

app.post('/api/products',async(req,res)=>{
    try {
        const product=await Product.create(req.body)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

mongoose.connect('mongodb+srv://rishabhv2806:Ko0p8inL8I63ljau@cluster0.0xpeoq0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log("connection failed")
})
