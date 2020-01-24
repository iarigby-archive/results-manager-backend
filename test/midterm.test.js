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
    it('files endopint', async () => {
        const res = await request(app)
            .get(`/exams/paradigms/final/results/${id}/asm_exam_checker`)
        expect(res.statusCode).equal(200)
        // console.log(res.body.files)
        // expect(res.body.midtermId).equal('4')
    })

    it('tasks endpoint', async () => {
        const res = await request(app)
            .get(`/exams/paradigms/final/tasks/${id}`)
        console.log(res.body)
        expect(res.statusCode).equal(200)
    })
    after(function () {
        kuzzle.disconnect()
    })
})