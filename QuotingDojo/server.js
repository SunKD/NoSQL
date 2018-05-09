
var express = require('express');
// Create an Express App
var app = express();
var session = require('express-session');
const flash = require('express-flash');
var mongoose = require('mongoose');
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
require('./server/config/routes.js')(app)

app.listen(8000, function () {
    console.log("listening on port 8000");
})