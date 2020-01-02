const router = require('express').Router()
const fs = require('fs')
const git = require('./git')
const backend = require('./kuzzle')

const returnFile = async(req, res) => {
    const id = req.params.studentid
        // console.log(id)
    await backend.kuzzle.connect()
    const student = await backend.get(id)
    const emailID = student._source.id
    const file = student._source.file
    git.getDiff(emailID, file)
        .then((data) => {
            // const lines = data.stdout.split('\n').map(Number)
            // console.log('out', data.stdout)
            // console.log('sending')
            // res.send({ text: data.stdout })
            // todo convert this to promise
            const solutionPath = `data/solutions/${file}`
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
                            solution: file
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

}

router.get('/:studentid', returnFile)

module.exports = router