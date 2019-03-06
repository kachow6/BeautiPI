const app = require('../app');
const dbconfig = require('../config/database');
const expect = require('chai').expect;
const chai = require('chai'), chaiHttp = require('chai-http');
const mongoose = require('mongoose');

chai.use(chaiHttp);

describe('test mongo users collection', function() {

    before('connect', function() {
        return mongoose.createConnection(dbconfig.url, dbconfig.options, function(err) {
            if (err) {
                console.log(err.stack);
                process.exit(1);
            }
        });
    })

    it('should retrieve a list of users', function() {
        chai.request(app)
        .get('/users')
        .then(function(res) {
            if (res.error) throw res.error; 
            expect(res).to.have.status(200);
        }).catch((err) => { console.log(err); });
    });

    it('should insert new user into db', function() {
        chai.request(app)
        .post('/users/insertuser')
        .send({ name: 'test', pw: '123' })
        .then(function(res) {
            if (res.error) throw res.error;
            expect(res).to.have.status(200);
        }).catch((err) => { console.log(err); });
    });

    it('should retrieve a single user', function() {
        chai.request(app)
        .get('/users/getuser')
        .query({ name: 'test' })
        .then(function(res) {
            if (res.error) throw res.error;
            expect(res).to.have.status(200);
        }).catch((err) => { console.log(err); });
    });

    it('should update user in db', function() {
        chai.request(app)
        .post('/users/updateuser')
        .send({ name: 'test', pw: '321' })
        .then(function(res) {
            if (res.error) throw res.error;
            expect(res).to.have.status(200);
        }).catch((err) => { console.log(err); });
    });

    it('should delete user from db', function() {
        chai.request(app)
        .post('/users/deleteuser')
        .send({ name: 'test' })
        .then(function(res) {
            if (res.error) throw res.error;
            expect(res).to.have.status(200);
        }).catch((err) => { console.log(err); });
    });
});
