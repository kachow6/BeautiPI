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
        .end(function(err, res) {
            if (err) throw err;
            expect(res).to.have.status(200);
        });
    });
});
