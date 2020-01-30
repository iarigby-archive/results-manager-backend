const request = require('supertest')
const app = require('../api/app')
const expect = require('chai').expect
const { kuzzle } = require('../services/kuzzle')
const fs = require('fs').promises
const { Path } = require('../types/paths')
const td = require('testdouble')

const id = 'gVKN3G8BksRrH9fHi2Hd'
const emailId = 'zkhut16'

describe('exam endpoint test', async() => {
    it('should return list of exams in the subject', async () => {
        request(app)
        .get('/exams/paradigms/final')
        .expect(200, {
            exams: ['midterm3', 'midterm4', 'final']
        })
    })
})
describe('midterm test', () => {
    before(function (done) {
        kuzzle.connect()
            .then(() => done())
    })


    // TODO this is useless and also duplicate of api.test
    it('exam endpoint', async () => {
        const res = await request(app)
            .get(`/exams/paradigms/final/`)
            .expect(200)
    })

    const exam = 'final'
    const task = 'farthest_node'
    
    it('update files', async () => {
        const fileName = `${task}.scm`
        const contents = 'abc'
        const data = {
            fileName: fileName,
            contents: contents
        }
        const res = await request(app)
            .post(`/exams/paradigms/${exam}/${id}/${task}/change`)
            .send(data)
            .expect(200)
            
        expect(res.body.status).to.equal('updated')
        const taskPath = new Path('paradigms').getTask(exam, emailId, task)
        const filePath = `${taskPath}/${fileName}-changes`
        const newContents = await fs.readFile(filePath, 'utf-8')
        expect(newContents).to.equal(contents)
        await fs.unlink(filePath)
    })

    it('should not update file if exam does not exist', async () => {
        const res = await request(app)
            .post(`/exams/paradigms/${exam}2/${id}/${task}/change`)
        expect(res.body.error.length > 0).to.be.true

    })

    it('should not update task that is not in the exam', async () => {
        const res = await request(app)
            .post(`/exams/paradigms/${exam}/${id}/${task}ab/change`)
        expect(res.body.error.length > 0).to.be.true
    })
    after(function () {
        kuzzle.disconnect()
    })
})