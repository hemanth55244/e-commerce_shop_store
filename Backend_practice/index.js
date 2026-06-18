const express = require('express');
const app = express()
const Product = require('./models/Products')
require('dotenv').config(); 
const connectdb = require('./config/db')
const productRoute = require("./routes/productRoute")
const authroute = require('./routes/authroute');
const { register } = require('./controllers/authcontroller');

app.use(express.json())


connectdb()

app.use("/product",productRoute)
app.use("/auth",authroute)


app.get("/",(req,res)=>{
   res.send("server is working ")
})

app.get("/get/products")


app.put("/update/products/:id",async (req,res)=>{
    
    try{

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
              new: true,
            runValidators: true,
            }
        )

        res.status(201).json({
    message: "details of products ",
    product
 })

    }catch(err){
res.status(500).json({
    message: err,
    })
}
})

app.delete("/del/products/:id",async (req,res)=>{
    
    try{

        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(201).json({
    message: " deleted ",
   
 })

    }catch(err){
res.status(500).json({
    message: err,
    
 })
}
})

app.listen(3002,()=>{
    console.log("server .started")
})