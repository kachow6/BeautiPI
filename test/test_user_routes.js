const app = require('../app');
const dbconfig = require('../config/database');
const expect = require('chai').expect;
const chai = require('chai'), chaiHttp = require('chai-http');
const mongoose = require('mongoose');

chai.use(chaiHttp);

describe('test retrieving users', function() {

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
            process.exit();
        }).catch((err) => { console.log(err); });;
    });
});
