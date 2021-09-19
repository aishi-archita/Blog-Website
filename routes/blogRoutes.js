const express = require('express');
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const router = express.Router();

//finding all blogs
router.get('/', (req,res)=>{
    Blog.find().sort({ createdAt : -1})
    .then((result)=>{
        res.render('index' , {title: 'All Blogs' , blogs : result})
    })
    .catch((err)=> {
        console.log(err);
    })
});

router.post('/' , (req,res)=> {
    const blog = new Blog(req.body);

    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.get('/create', (req,res)=>{
    
    res.render('create', {title: 'Create a New Blog'});
});


router.get('/:id', (req,res)=>{
    
    const id = req.params.id;

    Blog.findById(id)
    .then((result)=>{
        res.render('details' , {title : 'Blog Detail' , blog : result})
    })
    .catch((err)=>{
        res.status(404).render('404', {title: '404'});
    })
});

router.delete('/:id', (req, res )=> {

    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect : '/blogs'})  // we are sending json data instead of directly redirecting because this is an AJAX request
    })
    .catch((err)=>{
        console.log(err);
    })

})

module.exports = router;
