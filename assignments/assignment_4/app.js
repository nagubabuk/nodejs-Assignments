const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const User = require("./app_mongoose")

const app = express()
mongoose.connect('mongodb://localhost:27017/assignment_4');

app.use(bodyParser());
app.use(methodOverride('_method'))

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/',async(req,res)=>{
    const Data = await User.find();
    res.render("index.ejs",{Data})
})

app.get('/form',(req,res)=>{
    res.render("form.ejs")
})

app.post('/users/add',async(req,res)=>{
    await User.create({
        name: req.body.name,
        email:req.body.email
    })
    res.redirect('/')
})

app.put("/users/:id", async (req, res) => {
    await User.updateOne({_id: req.params.id}, [{$set:{isPromoted: {$not: "$isPromoted"}}}])
    res.redirect("/");
})

app.delete("/users/:id",async(req,res)=>{
    await User.deleteOne({_id: req.params.id})
    res.redirect("/");
})

app.listen(5000,()=>{
    console.log("Server is listening on port 3000")
}) 





