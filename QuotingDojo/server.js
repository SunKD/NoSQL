// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
var session = require('express-session');
const flash = require('express-flash');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    quote: { type: String, required: true, minlength: 5 }
}, { timestamps: true });
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'Quote'
var Quote = mongoose.model('Quote')
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
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
})
// Add User Request 
app.post('/quotes', function (req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
    var quote = new Quote(req.body);
    quote.save(function (err) {
        if (err) {
            // if there is an error upon saving, use console.log to see what is in the err object 
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            // redirect the user to an appropriate route
            return res.redirect('/');
        }
        else {
            return res.redirect('/quotes');
        }
    })
})

app.get('/quotes', function (req, res) {
    Quote.find({}).sort('-createdAt').exec(function (err, quotes) {
        if(err){
            console.log("something went wrong");
        }
        console.log(quotes);
        // res.send(quotes);
        return res.render('quotes', {"quotes": quotes});
    });

})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})