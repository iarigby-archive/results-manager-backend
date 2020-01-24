const router = require('express').Router()

const midterm = require('./midterm')
const dispute = require('./dispute')

// there's gotta be a better way to keep these in the 
// same file but not use this huge prefix
const contents = (req, res) =>
    res.send({ midtermId: req.params.examId })

router.get('/', (req, res) => res.send({ status: 'OK' }))
router.get('/exams/:subject/:examId/', contents)
router.get('/exams/:subject/:examId/tasks/:studentid', midterm.getStudentTasks)
router.get('/exams/:subject/:examId/results/:studentid/:task', midterm.returnFile)
router.get('/exams/:subject/:examId/disputes/:studentid/:task', dispute.getDisputes)
router.post('/exams/:subject/:examId/disputes/:studentid/:task/new', dispute.createDispute)

// this might need to use 
router.get('/exams/:subject/:examId/disputes/:studentid/resolve/:disputeid', dispute.resolveDispute)


module.exports = router