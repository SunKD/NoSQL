module.exports = () => {
    require('../models/quote')();
    return {
        index: (req, res) =>{
            res.render('index');
        },
        addquote: (req, res) => {
            var quote = new Quote(req.body);
            quote.save(function (err) {
                if (err) {
                    for (var key in err.errors) {
                        req.flash('registration', err.errors[key].message);
                    }
                    return res.redirect('/');
                }
                else {
                    return res.redirect('/quotes');
                }
            })
        },
        quotes: (req, res) =>{
            Quote.find({}).sort('-createdAt').exec( (err, quotes) => {
                if (err) {
                    console.log("something went wrong");
                }
                return res.render('quotes', { "quotes": quotes });
            });
        }
    }
}