module.exports = (app) => {
    var route = require("../controllers/quotes")();
    app.get('/',(req, res) => {
        route.index(req, res);
    })
    app.post('/quotes', (req, res) =>{
        route.addquote(req, res);
    })
    app.get('/quotes', (req, res) =>{
        route.quotes(req, res);
    })
}

