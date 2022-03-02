const express = require("express");
const app = express();
const bodyParser=require("body-parser")
//  app.use(express.static("public"));
app.set("views",'./views')
app.set('view engine','ejs')
var faker = require('faker');
const user=[]
app.use(bodyParser())

for (let i=0;i<=5;i++){
    user.push({
            name:faker.name.findName(),
            email:faker.internet.email(),
            phone:faker.phone.phoneNumber()
            })
}

app.get("/",(req,res)=>{
    console.log(user)
    res.render("index.ejs",{user})
})
app.get("/form",(req,res)=>{
    res.render("form.ejs")
})

app.post("/user/add",(req,res)=>{
    user.push({name:req.body.name,
    email:req.body.email,
    phone:req.body.phone})
    res.redirect('/')
})
app.listen(3000,()=>{
    console.log("server is loaded")
})