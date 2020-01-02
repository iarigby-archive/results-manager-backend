const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');


const midtermController = require('./midterm')
const disputeController = require('./dispute')
    // run()

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Content-Type', 'application/json');
    next();
});
app.use('/midterms/:midtermId/results', midtermController)
app.use('/midterms/:midtermId/disputes', disputeController)
app.listen(3000)