const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const expect = chai.expect
const should = chai.should()
const { describe, it } = require('mocha')

chai.use(chaiHttp)

describe('Auth Controller', () => {
    describe('POST /register', () => {
        it('should register a new user', (done) => {
            const newUser = {
                fname: 'John',
                lname: 'Doe',
                email: 'jwen@example.com',
                password: 'password123',
            }
            chai.request(app)
                .post('/api/auth/register')
                .set('Content-Type', 'application/json')
                .send(newUser)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body.message).to.equal('User successfully created')
                    done()
                })
        }).timeout(10000)

        it('should return an error if email already exists', (done) => {
            const existingUser = {
                fname: 'Jane',
                lname: 'Doe',
                email: 'jane@example.com',
                password: 'password123',
            }
            chai.request(app)
                .post('/api/auth/register')
                .send(existingUser)
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.body.message).to.equal('Email already exists')
                    done()
                })
        })
    })

    describe('POST /login', () => {
        it('should login a user and return a token', (done) => {
            const userCredentials = {
                email: 'john@example.com',
                password: 'password123',
            }
            chai.request(app)
                .post('/api/auth/login')
                .send(userCredentials)
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.a('string')
                    done()
                })
        })

        it('should return an error for incorrect email or password', (done) => {
            const incorrectCredentials = {
                email: 'wrong@example.com',
                password: 'wrongpassword',
            }
            chai.request(app)
                .post('/api/auth/login')
                .send(incorrectCredentials)
                .end((err, res) => {
                    expect(res.status).to.equal(400)
                    expect(res.text).to.equal('Incorrect email')
                    done()
                })
        })
    })

})