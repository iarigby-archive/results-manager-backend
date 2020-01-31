const router = require('express').Router()

const midterm = require('./midterm')
const dispute = require('./dispute')

// there's gotta be a better way to keep these in the 
// same file but not use this huge prefix
const contents = (req, res) =>
    res.send({ midtermId: req.params.examId })

router.get('/', (req, res) => res.send({ status: 'OK' }))
router.get('/exams/:subject/', midterm.getSubjectExams)
router.get('/exams/:subject/:exam/', contents)
// router.get('/exams/:subject/:exam/tasks/:studentid', midterm.getStudentTasks)
router.get('/exams/:subject/:exam/:studentid/', midterm.getExamData)
// router.get('/exams/:subject/:exam/disputes/:studentid/:task', dispute.getDisputes)
router.post('/exams/:subject/:exam/:studentid/:task/change', midterm.addNewFile)
// this might need to use put
router.get('/disputes/:studentid', dispute.getDisputes)
router.post('/disputes/:studentid/', dispute.createDispute)
router.get('/disputes/:studentid/:disputeid/resolve', dispute.resolveDispute)


module.exports = router