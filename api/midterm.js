const fs = require('fs').promises
const git = require('../services/git')
const backend = require('../services/kuzzle')
const { path, tasks } = require('../config/config')
const { Path } = require('../types/paths')

module.exports.getSubjectExams = async(req, res) => {
    const subject = req.params.subject
    const path = new Path(subject)
    const dirs = await fs.readdir(path.getSubject())
    res.send({exams: dirs})
}

// TODO not using
module.exports.getStudentTasks = async (req, res) => {
    const id = req.params.studentid
    const subject = req.params.subject
    const exam = req.params.examId
    try {
        const data = await backend.get(id)
        const student = data._source
        res.setHeader('Content-Type', 'application/json');
        res.status(200)
        res.send({
            tasks: student.results[subject][exam].tasks
        })
    } catch (e) {
        res.status(404)
        res.send('student not found')
    }

}
const getFileContent = async (filePath) => {
    const file = {
        name: fileName,
        contents: 'Not Found'
    }
    try {
        const fileContents = await fs.readFile(filePath, 'utf-8')
        file.contents = fileContents
    } catch (e) {
    }
    return file
}
module.exports.getExamData = async (req, res) => {
    const id = req.params.studentid
    const subject = req.params.subject
    const exam = req.params.examId
    // TODO 
    const data = await backend.get(id)
    const student = data._source
    const emailId = student.emailId
    const result = student.results[subject][exam]
    if (typeof result == 'undefined') {
        res.status(404)
        res.send()
        return
    }
    result.name = exam
    result.disputes = student.disputes
    result.emailId = emailId
    result.files = {}
    for (task of Object.keys(tasks[exam])) {
        result.files[task] = []
        // TODO tasks is a stupid name
        for (fileName of tasks[exam][task]) {
            const filePath = `${path}/${subject}/${exam}/${emailId}/${task}/${fileName}`
            try {
                const file = await getFileContent(filePath)
            result.files[task].push(file)
            } catch (e) {
            }
        }
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.send(result)

}