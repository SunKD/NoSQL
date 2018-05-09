const mongoose = require('mongoose');
module.exports = () =>{
    mongoose.connect('mongodb://localhost/basic_mongoose');
    var QuoteSchema = new mongoose.Schema({
        name: { 
            type: String, 
            required: true, 
            minlength: 3 
        },
        quote: { 
            type: String, 
            required: true, 
            minlength: 5 
        }
    }, { timestamps: true });
    Quote = mongoose.model('Quote', QuoteSchema); 
}


