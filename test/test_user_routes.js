const app = require('../app');
const dbconfig = require('../config/database');
const expect = require('chai').expect;
const chai = require('chai'), chaiHttp = require('chai-http');
const mongoose = require('mongoose');

chai.use(chaiHttp);

describe('testing user routes', function() {

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
        .send(function(err, res) {
            if (err) throw err;
            expect(res).to.have.status(200);
        });
    });

    it('should insert new user into db', function() {
        chai.request(app)
        .post('/insertuser')
        .send({ name: 'test', pw: '123' })
        .then(function(err, res) {
            if (err) throw err;
            expect(res).to.have.status(200);
        }).catch(() => {});
    });

    it('should retrieve a single user', function() {
        chai.request(app)
        .get('/getuser')
        .query({ name: 'test' })
        .send(function(err, res) {
            if (err) throw err;
            expect(res).to.have.status(200);
        }).catch(() => {});
    });

    it('should update user in db', function() {
        chai.request(app)
        .post('/updateuser')
        .send({ name: 'test', pw: '321' })
        .then(function(err, res) {
            if (err) throw err;
            expect(res).to.have.status(200);
        }).catch(() => {});
    });

    it('should delete user from db', function() {
        chai.request(app)
        .post('/deleteuser')
        .send({ name: 'test' })
        .then(function(err, res) {
            if (err) throw err;
            expect(res).to.have.status(200);
        }).catch(() => {});
    });
});
