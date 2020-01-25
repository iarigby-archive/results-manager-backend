const request = require('supertest')
const app = require('../api/app')
const expect = require('chai').expect



describe('subject exams', () => {
    it('contents', async () => {
        const res = await request(app)
            .get('/exams/paradigms')
        expect(res.body.exams.length).to.equal(3)
    })
})