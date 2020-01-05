const app = require('express')()

const inputSanitizer = require('sanitize').middleware
app.use(inputSanitizer);

const morgan = require('morgan')
app.use(morgan('combined'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json');
    next();
});


const routes = require('./routes')
app.use('/', routes)
    // app.listen(3000)

module.exports = app