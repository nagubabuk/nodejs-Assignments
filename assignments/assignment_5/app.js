const express = require("express");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const SECRET = "RESTAPI";
const loginRoutes = require("./routes/login");
const postRoutes = require("./routes/posts");

mongoose.connect('mongodb://localhost:27017/restapi');
const app = express();

app.use("/api/v1/posts", (req, res, next) =>{
    var token = req.headers.authorization.split("task ")[1];
    if(!token){
        return res.status(401).json({
            status: "failed",
            message: "Token is missing"
        })
    }
    
    jwt.verify(token, SECRET, async function(err, decoded) {
        if(err){
            return res.status(401).json({
                status:"failed",
                message: "Invalid token"
            })
        }
        req.user = decoded.data;
        next();
    });
});

app.use("/api/v1", loginRoutes);
app.use("/api/v1", postRoutes); 


app.listen(3000, () => console.log("server is started"));