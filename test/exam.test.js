const request = require('supertest')
const app = require('../api/app')
const expect = require('chai').expect



describe('subject exams', () => {
    it('contents', async () => {
        const res = await request(app)
            .get('/exams/paradigms')
        console.log(res.body)
        expect(res.body.exams.length > 0).to.be.true
    })
})