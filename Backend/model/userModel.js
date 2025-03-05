const mongoose = require("mongoose") ;
const PostSchema = new mongoose.Schema({
    userName : {type : String  , required : true } ,
    title: { type: String, required: true },
    content: { type: String, required: true },
    email : {type : String , required : true } ,
    // author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    password : { type : String , required : true } ,
    comment :{type : String } 
}, { timestamps: true })

const PostModel = mongoose.model("postmodel" , PostSchema) ;
module.exports = PostModel ;
