const app = require('../app');
const expect = require('chai').expect;
const chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('test API configuration routes', function() {

    it('should receive a 200 response', function() {
        chai.request(app)
        .get('/config')
        .then(function(res) {
            if (res.error) throw res.error; 
            expect(res).to.have.status(200);
        }).catch((err) => { console.log(err); });
    });

    it('should retrieve current container hostname', function() {
        chai.request(app)
        .get('/config/gethostname')
        .then(function(res) {
            if (res.error) throw res.error;
            expect(res).to.have.status(200);
        }).catch((err) => { console.log(err); });
    });
});
