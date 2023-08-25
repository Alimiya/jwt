const chai = require('chai')
const chaiHttp = require('chai-http')
const express = require('express')
const app = express()
const expect = chai.expect
const { describe, it } = require('mocha')

chai.use(chaiHttp)

describe('Auth Middleware', () => {
    it('should pass with a valid token', (done) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU5MTI0OThiYmY0NjRkNmYwM2UwMjMiLCJpYXQiOjE2OTI5OTYzMjN9.sZiWNw9CreJJnmjBe97MYWbV7j43HlezRtKBl2ePeFg'
        chai.request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })

    it('should return 401 with an invalid token', (done) => {
        const token = 'invalid_token'
        chai.request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(401)
                done()
            })
    })

})