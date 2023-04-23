const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const LoginDetails = require('./schema/logindetail')
const app = new express;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

mongoose.connect('mongodb+srv://BharathKumar-3:kXlZutYY2omP7tyL@cluster0.fjop0gf.mongodb.net/ExpenseTrackerLoginDetails').then(()=>{
    console.log('connected')
})

app.get("/api/health",(req,res,next)=>{
    res.send("server is running");
})
app.post("/api/logindetails",async(req,res,next)=>{
    try{
    console.log(req.body);
    const available = await LoginDetails.find({"username":req.body.username})
    console.log(available)
    if(available.length == 0)
    {
        res.send({response:0});
    }
    else
    {
        if(available[0].password == req.body.password)
        {
            const userId = (available[0]._id).toString();
            res.send({response:userId});
        }
        else
        {
            res.send({response:-1});
        }
    }
    }
    
    catch(err)
    {
        res.send({response:"Error"});
    }
})

app.post("/api/createUser",async function(req,res){
    try{
        console.log(req.body);
        const available = await LoginDetails.find({"username":req.body.username})
        console.log(available)
        if(available.length == 0)
        {
            const newUser = new LoginDetails({
            username:req.body.username,
            password:req.body.password
            })
            newUser.save();
            res.send({response:1});
        }
        else{
            res.send({response:-1})
        }
    }
    catch(err){

    }
})
app.post("/api/getExpense",async function(req,res){
    try{
        const userId = req.body.userId;
        const expenseData = await LoginDetails.find({"_id" : new mongoose.Types.ObjectId(userId)});
        res.send({data : expenseData[0].expense});
    }
    catch(error){
        console.log(error);
    }
})

app.put("/api/addExpense", async function(req,res){
    res.send("hello");
    console.log(req.body);
    try{
        let userId = req.body.userId
        delete req.body.userId
        const available = await LoginDetails.updateOne(
            { _id: new mongoose.Types.ObjectId(userId)}, 
            { $push: { expense:   req.body} });
        console.log(available)
    }
    catch(err){
        console.log(err);
    }
})
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log("Server is running");
})
