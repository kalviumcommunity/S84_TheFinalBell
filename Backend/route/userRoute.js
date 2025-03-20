const express = require("express");
const router = express.Router();
const PostModel = require("../model/userModel");
const mongoose  = require("mongoose");

const Badges = ()=>mongoose.connection.db.collection('Badges')

router.get("/badge", async(req,res)=>{
    try{

        const badges = await Badges().find({}).toArray()

        res.status(201).json({message:"success", Badges:badges})
    }
    catch(err){
        console.log(err)
    }
})

router.post("/create", async (req, res) => {
    try {
        const newPost = new PostModel(req.body);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/read", async (req, res) => {
    try { 
        const posts = await PostModel.find() 
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/read/:id", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ error: "Post not found" });
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedPost = await PostModel.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ error: "Post not found" });
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;