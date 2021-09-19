const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://archita_swarna:S1vs1pgd@cluster0.oavpj.mongodb.net/swarna?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine' , 'ejs');
//app.set('views', 'myViews');


//midleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(morgan('dev'));

 //mongoose and mongo sandbox routes

//creating and saving a blog record
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title : "Boode Payesh Recipe",
        snippet : "Payesh is one of the most loved Bengali Desserts. Another yummylicious dish!",
        body : "Test file and go to google for more"
    })

    blog.save()
    .then((result)=> {
        res.send(result);
    })
    .catch((err)=> {
        console.log(err);
    })
});

//retrieve all blogs
app.get('/all-blogs' , (req,res)=> {
    Blog.find()
    .then((result)=> {
        res.send(result);
    })
    .catch((err)=> {
        console.log(err);
    })
});

//find a single blog
app.get('/single-blog' , (req, res)=> {
    Blog.findById('6132d5ba45207701b1fd3f66')
    .then((result)=> {
        res.send(result);
    })
    .catch((err)=> {
        console.log(err);
    })
});


//routes

app.get('/' , (req, res)=> {
    /* const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index' , {title: 'Home' , blogs}); */

    //redirecting the home to all blogs
    res.redirect('/blogs');

});

app.get('/about', (req, res)=>{
   
    res.render('about' , {title: 'About'});
});

//blog routes
app.use( '/blogs', blogRoutes);

//404 page
app.use((req,res) => {
    res.status(404).render('404', {title: 'Page Not Found'});
});








