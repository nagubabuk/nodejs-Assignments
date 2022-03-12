const express = require("express");
const router = express.Router();
const Post = require("../database/app_mongoose");
const bodyparser = require("body-parser");


router.get("/posts", async (req, res) =>{
    console.log(req.body)
    const posts = await Post.find();
    res.json({
        status: "success",
        posts
    });
})
//for creating posts

router.post("/posts", async (req, res) => {
    const post = await Post.create({
        title: req.body.title,
        body: req.body.body,
        img: req.body.img,
        user: req.user
    })
    res.json({
        status: "successefully post created",
        post
    })
})

//for updating or editing post

router.put("/posts/:id", async (req, res) => {
    const post = await Post.updateOne({_id: req.params.id, user: req.user}, {body: req.body.body});
    if(post.modifiedCount > 0){
        res.json({
            status: "Post updated",
        })
    }else {
        res.json({
            status: "User can not update this post"
        })
    }

})
//for deleting posts

router.delete("/posts/:id", async (req, res) => {
    const post = await Post.deleteOne({_id: req.params.id, user: req.user});
    console.log(post);
    if(post.deletedCount > 0){
        res.json({
            status: "Post Deleted",
        })
    }else {
        res.json({
            status: "not authorise to delete",
        })
    }
    
})

module.exports = router;