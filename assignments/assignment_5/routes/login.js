const express = require("express");
const User = require("../database/userschem");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const SECRET = "RESTAPI";

router.use(bodyparser());
router.post("/register", body("email"), body("name"), body("password"),async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        const { name, email,password} = req.body;
        bcrypt.hash(password, 10, async function(err, hash) {
            if(err){
                res.status(400).json({
                    status: "failed",
                    message: "Invalid details"
                })
            }
            const user = await User.create(
                { 
                    name,
                    email, 
                    password:hash
                }
            );
            res.json({
                status: "success",
                user
            })
        });
       
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

router.post("/login", body("email"),body("password"), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({
                status:"failed",
                message:"Invalid user"
            })
        }
        
        bcrypt.compare(password, user.password).then(function(result) {
            if(result){
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, SECRET);
                res.json({
                    status: "sucess",
                    token
                })
            }else{
                res.status(401).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
        });
       
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = router;