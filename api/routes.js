const router = require('express').Router()

const midterm = require('./midterm')
const dispute = require('./dispute')

// there's gotta be a better way to keep these in the 
// same file but not use this huge prefix
const contents = (req, res) =>
    res.send({ midtermId: req.params.midtermId })

router.get('/', (req, res) => res.send({ status: 'OK' }))
router.get('/midterms/:midtermId/', contents)
router.get('/midterms/:midtermId/results/:studentid', midterm.returnFile)
router.get('/midterms/:midtermId/disputes/:studentid', dispute.getDisputes)
router.post('/midterms/:midtermId/disputes/:studentid/new', dispute.createDispute)

// this might need to use 
router.get('/midterms/:midtermId/disputes/:studentid/resolve/:disputeid', dispute.resolveDispute)


module.exports = router