// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
var session = require('express-session');
const flash = require('express-flash');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/message_board_mongoose');
var PostSchema = new mongoose.Schema({
    username: { type: String, index: true, required: true, unique: true },
    message: { type: String, required: true, minlength: 5 },
    comments: [{
        commentsusername: { type: String, required: true },
        comment: { type: String, required: true, minlength: 5 }
    }]
}, { timestamps: true });
mongoose.model('Post', PostSchema); // We are setting this Schema in our Models as 'Quote'
var Post = mongoose.model('Post')
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
app.use(session({
    secret: 'somesuperdupersecret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash());
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function (req, res) {
    Post.find({}, function (err, posts) {
        if (err) {
            console.log("something went wrong");
        }
        return res.render('index', { "posts": posts });
    })
})

app.post('/post', function (req, res) {
    var newPost = new Post(req.body);
    newPost.save(function(err) {
        if (err) {
            console.log("We have an error!", err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            return res.redirect('/');
        }
        else {
            return res.redirect('/');
        }
    })
})

app.post('/comment/:id', function (req, res) {
    Post.findByIdAndUpdate({_id: req.params.id},{ $push: {comments: { commentsusername: req.body.username, comment: req.body.comment }}},{runValidators: true}, function(err){
        if (err) {
            console.log("We have an error!", err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            return res.redirect('/');
        }
        else {
            console.log("no error")
            return res.redirect('/');
        }
    });
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})