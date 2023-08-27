const chai = require('chai')
const chaiHttp = require('chai-http')
const express = require('express')
const app = require('../index')
const expect = chai.expect
const { describe, it } = require('mocha')

chai.use(chaiHttp)

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViNDhjNWJkMGNkN2I2NmM2ODA1NzMiLCJpYXQiOjE2OTMxNDE4Nzh9.4x9nRtcg3dTND3_M90D6rqEPeJLSJ2mcakETGfCGFDM'
const userId = '64eb48b2bd0cd7b66c680570'
describe('User Controller', () => {
    describe('GET /api/users', () => {
        it('should get all users', (done) => {
            chai.request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        }).timeout(10000)
    })

    describe('GET /api/users/:id', () => {
        it('should get a user by ID', (done) => {
            chai.request(app)
                .get(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${token}`)
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
                .set('Authorization', `Bearer ${token}`)
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
            const updatedUser = {
                fname: 'Updated John',
                lname: 'Updated Doe',
                email: 'updated_john@example.com',
                password: 'updated_password',
            }
            chai.request(app)
                .put(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${token}`)
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
             chai.request(app)
                 .delete(`/api/users/${userId}`)
                 .set('Authorization', `Bearer ${token}`)
                 .end((err, res) => {
                     expect(res).to.have.status(200)
                     expect(res.body).to.be.an('object')
                     done()
                 })
         })
     })
})