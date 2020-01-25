const request = require('supertest')
const app = require('../api/app')
const expect = require('chai').expect
const { kuzzle } = require('../services/kuzzle')

const id = 'Sjez028Bzia3gFHf48Br'
describe('midterm test', () => {
    before(function (done) {
        kuzzle.connect()
            .then(() => done())
    })


    // TODO this is useless and also duplicate of api.test
    it('exam endpoint', async () => {
        const res = await request(app)
            .get(`/exams/paradigms/final/`)
        expect(res.statusCode).equal(200)
    })

    const exam = 'final'
    const task = 'talent_show'
    const fileName = 'talent_show.c'

    it('update files', async () => {
        const res = await request(app)
            .post(`/exams/paradigms/${exam}/${id}/${task}/change`)
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