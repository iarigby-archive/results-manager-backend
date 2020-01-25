const request = require('supertest')
const app = require('../api/app')
const expect = require('chai').expect

describe('basic functionality test', () => {
    it('shoud start up', async() => {
        const res = await request(app)
            .get('/')
        expect(res.statusCode).equal(200)
        expect(res.body.status).equal('OK')
    })

    it('shoud route the miterms', async() => {
        const res = await request(app)
            .get('/exams/paradigms/midterm4')
        expect(res.statusCode).equal(200)
        expect(res.body.midtermId).equal('midterm4')
    })
})