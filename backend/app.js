const express = require('express');
const bodyparser = require('body-parser');
const mongoos = require('mongoose');

mongoos.connect("mongodb://raven:raven123@ds017514.mlab.com:17514/heroku_3n6jhnlx", { useNewUrlParser: true , useUnifiedTopology: true })
.then(()=>{ console.log('Connection established with Mongo DB')})
.catch((e)=>{
    console.log('Connection failed ');
});

const Post = require('./models/post');

const app = express();

app.use(bodyparser.json());

app.use((req,res,next)=>{
    console.log("Inside first middleware");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-MethodS","GET, POST , DELETE, PUT , OPTIONS, PATCH");
    res.setHeader("Access-Control-Allow-Headers","Origin,Content-Type,Accept,X-Requested-With");
    next();
});


app.post("/api/posts",(req,res,next)=>{
    const post =  new Post( {title : req.body.title, content : req.body.content});
    console.log(post);
    post.save().then((result)=>{
        console.log(result);
        res.status(201).json({message:"Post created successfully", postid : result._id}); 
    });
});


app.get("/api/posts",(req,res,next)=>{
    console.log("Inside second middleware");
    Post.find().then((documents)=>{
        res.status(200).json({
            'message' : 'Posts fetched successfully',
             'posts' : documents
        });
    }).catch(()=>{
        console.log("No record found from Mongo");
        res.status(200).json({
            'message' : 'Posts fetched successfully',
             'posts' : [] 
        });
    });

     
});

app.delete('/api/posts/:id', (req , res, next) => {
    console.log('deleting  id : ',req.params.id);
    Post.deleteOne( { _id : req.params.id } ).then( result => {
            console.log(" Result "+ result);    
            res.status(200).json( { message : 'Post deleted' } );
        });
} );

module.exports = app;