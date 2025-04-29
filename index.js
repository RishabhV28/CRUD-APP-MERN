
const express = require("express")
const app= express()
const mongoose=require('mongoose')
const Product=require('./models/product.models.js')

app.use(express.json())

app.use("/api/products",productRoute)

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
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

app.get('/api/products',async(req,res)=>{
    try{
        const products =await Product.find({})
        res.status(200).json(products)

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

app.get('/api/products/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const product=await Product.findById(id)
        res.status(200).json(product)

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

//update product

app.put('/api/products/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const product=await Product.findByIdAndUpdate(id,req.body)

        if(!product){
            return res.status(404).json({message:'not found'})
        }
        const updatedProduct=await Product.findById(id)
        res.status(200).json(updatedProduct)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

//delete product

app.delete('/api/products/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const product=await Product.findByIdAndDelete(id)

        if(!product){
            return res.status(404).json({mesage:"not found"})
        }
        res.status(200).json({message:"product deleted succesfully"})
    }
    catch(error){
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
