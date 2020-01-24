const fs = require('fs').promises
const git = require('../services/git')
const backend = require('../services/kuzzle')
const { path, tasks } = require('../config/config')

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

module.exports.returnFile = async (req, res) => {
    const id = req.params.studentid
    const subject = req.params.subject
    const exam = req.params.examId
    const task = req.params.task
    // TODO 
    const data = await backend.get(id)
    const student  = data._source
    const emailId = student.emailId
    // const result = {}
    // const results = student.results[subject][exam].tasks
    // for (task of results) {
        const fileContents = []
        const files = tasks[exam][task]
        for (fileName of files) {
            const filePath = `${path}/${subject}/${exam}/${emailId}/${task}/${fileName}`
            const file = {
                name: fileName,
                contents: 'Not Found'
            }
            try {
                const fileContents = await fs.readFile(filePath, 'utf-8')
                file.contents = fileContents
            } catch (e) {
            }
            fileContents.push(file)
        }
        // result[task] = fileContents
    // }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.send({
        // results: result
        results: fileContents
    })


    /*
    git.getDiff(emailID, file)
        .then((data) => {
            // const lines = data.stdout.split('\n').map(Number)
            // console.log('out', data.stdout)
            // console.log('sending')
            // res.send({ text: data.stdout })
            // todo convert this to promise
            const solutionPath = `${path}/solutions/${file}`
            fs.readFile(solutionPath, 'utf8',
                    (err, file) => {
                        if (err) {
                            res.send('error')
                            console.log(err)
                            return;
                        }
                        // console.log(file.replace('\r\n', '<br>'))
                        res.setHeader('Content-Type', 'application/json');
                        res.send({
                            text: data.stdout,
                            solution: file,
                            files: [{name: fileName, file: file}]
                        })
                    },
                    err => {
                        console.log('err', err)
                        res.send(err)
                    }
                )
                // console.log(data.stderr, 'err')
        })
        .catch((err) => {
            console.log(err, 'errcatch')
            res.status(501)
            res.send("error occured")
        })
        */

}