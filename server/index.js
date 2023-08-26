const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 8080

// Schema
const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : Number,
},{
    timestamps : true
})

//model

const userModel = mongoose.model("user",schemaData)

//read data
app.get('/', async (req, res) => {
    const data = await userModel.find({})

    res.json({ success : true ,data:data})
})

//create data  || save data
app.post('/create', async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save( )
    res.send({success : true , message : "Data save ",data : data})
})

//update data
app.put("/update", async (req ,res)=>{
    console.log(req.body)
    const {id ,...rest} = req.body

    console.log(rest)
    const data = await  userModel.updateOne({_id : id},rest)
    res.send({success : true , message : "Data will updated ",data : data})

})

//delete
app.delete("/delete/:id", async (req ,res)=>{
   const id = req.params.id
   console.log(id)
   const data = await userModel.deleteOne({_id : id})
   res.send({success : true , message : "Data will deleted ",data : data})

})



mongoose.connect("mongodb://127.0.0.1/crudoperation")
    .then(() => {
        console.log("connect to DB")
        app.listen(PORT, () => console.log("server is running"))

    })
    .catch((err) => console.log(err))
