const router = require('express').Router()

const midterm = require('./midterm')
const dispute = require('./dispute')

// there's gotta be a better way to keep these in the 
// same file but not use this huge prefix
const contents = (req, res) =>
    res.send({ midtermId: req.params.examId })

router.get('/', (req, res) => res.send({ status: 'OK' }))
router.get('/exams/:subject/', midterm.getSubjectExams)
router.get('/exams/:subject/:examId/', contents)
// router.get('/exams/:subject/:examId/tasks/:studentid', midterm.getStudentTasks)
router.get('/exams/:subject/:examId/:studentid/', midterm.getExamData)
// router.get('/exams/:subject/:examId/disputes/:studentid/:task', dispute.getDisputes)
router.post('/exams/:subject/:examId/:studentid/disputes/:task/new', dispute.createDispute)

// this might need to use put
router.get('/exams/:subject/:examId/:studentid/disputes/:disputeid/resolve', dispute.resolveDispute)


module.exports = router