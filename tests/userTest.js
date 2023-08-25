const chai = require('chai')
const chaiHttp = require('chai-http')
const express = require('express')
const app = express()
const expect = chai.expect
const { describe, it } = require('mocha')

chai.use(chaiHttp)

describe('User Controller', () => {
    describe('GET /api/users', () => {
        it('should get all users', (done) => {
            chai.request(app)
                .get('/api/users')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
    })

    describe('GET /api/users/:id', () => {
        it('should get a user by ID', (done) => {
            const userId = req.params
            chai.request(app)
                .get(`/api/users/${userId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })

    describe('POST /api/users', () => {
        it('should create a new user', (done) => {
            const newUser = {
                fname: 'John',
                lname: 'Doe',
                email: 'john@example.com',
                password: 'password',
            }
            chai.request(app)
                .post('/api/users')
                .send(newUser)
                .end((err, res) => {
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })

    describe('PUT /api/users/:id', () => {
        it('should update a user by ID', (done) => {
            const userId = req.params
            const updatedUser = {
                fname: 'Updated John',
                lname: 'Updated Doe',
                email: 'updated_john@example.com',
                password: 'updated_password',
            }
            chai.request(app)
                .put(`/api/users/${userId}`)
                .send(updatedUser)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })

    describe('DELETE /api/users/:id', () => {
        it('should delete a user by ID', (done) => {
            const userId = req.params
            chai.request(app)
                .delete(`/api/users/${userId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })
})