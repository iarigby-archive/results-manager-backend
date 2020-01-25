const fs = require('fs').promises
const git = require('../services/git')
const backend = require('../services/kuzzle')
const { path, tasks } = require('../config/config')
const { Path } = require('../types/paths')

module.exports.getSubjectExams = async (req, res) => {
    const subject = req.params.subject
    const path = new Path(subject)
    const dirs = await fs.readdir(path.getSubject())
    res.send({ exams: dirs })
}

module.exports.addNewFile = async (req, res) => {
    const exam = req.params.exam
    if (!tasks[exam]) {
        res.status(201)
        res.send({ error: 'exam not found' })
        return
    }
    const task = req.params.task
    if (!tasks[exam][task]) {
        res.status(201)
        res.send({ error: 'task not found' })
        return
    }
    const subject = req.params.subject
    const id = req.params.studentid
    const data = await backend.get(id).catch(e => console.log(e))
    const emailId = data._source.emailId
    console.log(emailId)
    console.log(req.body)
    const location = new Path(subject).getTask(exam, emailId, task)
    // const destination = 
    const newFileName = req.body.fileName + '-changes'
    const path = `${location}/${newFileName}`
    console.log(path)
    fs.writeFile(path, req.body.contents, 'utf-8')
    .then(() =>
        res.send({status: "updated"})
    )
}

// TODO not using
module.exports.getStudentTasks = async (req, res) => {
    const id = req.params.studentid
    const subject = req.params.subject
    const exam = req.params.exam
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
    const exam = req.params.exam
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
    result.id = id
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