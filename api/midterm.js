const fs = require('fs').promises
const git = require('../services/git')
const database = require('../services/kuzzle')
const config = require('../config/config')
const { Path } = require('../types/paths')

module.exports.getSubjectExams = async (req, res) => {
    const subject = req.params.subject
    const path = new Path(subject)
    const dirs = await fs.readdir(path.getSubject())
    const exams = dirs.map(e => {
        return {
            name: e,
            name_ge: config.getExam(subject, e).name_ge
        }
    })
    res.send({
        name_ge: config.getSubjectName(subject),
        exams: exams
    })
}

// ღმერთო ჩემო
module.exports.addNewFile = async (req, res) => {
    const exam = req.params.exam
    const subject = req.params.subject
    if (!config.subjects[subject]) {
        res.status(201)
        res.send({ error: `subject ${subject} not found` })
    }
    const examData = config.getExam(subject, exam)
    if (!examData) {
        res.status(201)
        res.send({ error: `exam ${exam} not found in subject ${subject}` })
        return
    }
    const task = req.params.task
    const tasks = config.getTasks(examData)
    const taskData = tasks[task]
    if (!taskData) {
        res.status(201)
        res.send({ error: `task ${task} not found for exam ${exam} in subject ${subject}` })
        return
    }

    const id = req.params.studentid
    const fileName = req.body.fileName
    const files = taskData.getTaskFiles(taskData)
    const file = files.find(f => f.includes(fileName))
    if (!file) {
        res.status(201)
        res.send({ error: `${task} has no file ${fileName}` })
    }
    const data = await database.get(id).catch(e => console.log(e))
    const emailId = data._source.emailId
    const location = new Path(subject).getStudent(exam, emailId)
    // const destination = 
    const newFileName = file + '-changes'
    // TODO deal with exams with subfolders
    const path = `${location}/${newFileName}`
    fs.writeFile(path, req.body.contents, 'utf-8')
        .then(() =>
            res.send({ status: "updated" })
        ).catch(e => console.log(e))
}

// TODO not using
module.exports.getStudentTasks = async (req, res) => {
    const id = req.params.studentid
    const subject = req.params.subject
    const exam = req.params.exam
    try {
        const data = await database.get(id)
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
    const data = await database.get(id)
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
    const examData = config.getExam(subject, exam)
    const path = new Path(subject)
    const tasks = config.getTasks(examData)
    for (task of tasks) {
        result.files[task.name] = []
        // TODO tasks is a stupid name
        const files = task.getTaskFiles(task)
        for (fileName of files) {
            const filePath = `${path.getStudent(exam, emailId)}/${fileName}`
            try {
                const file = await getFileContent(filePath)
                result.files[task.name].push(file)
            } catch (e) {
            }
        }
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.send(result)

}