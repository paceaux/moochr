const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js');

const testCategory = {
    name: "test name",
    slug: "test-slug",
    parent: 3
};

describe('API endpoint /category', function (){
    this.timeout(5000);

    before(function () {

    });

    after(function () {

    });

    it('should return some categories', function () {
        return chai.request('http://localhost:3000/api/v1')
            .get('/category')
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

    it('should add a category', function () {
        return chai.request('http://localhost:3000/api/v1')
            .post('/category')
            .send(testCategory)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object').to.have.all.keys('id', 'name', 'slug', 'parent', 'timestamp');
            });
    });

    it('should delete a category', function () {
        return chai.request('http://localhost:3000/api/v1')
            .get('/category/')
            .then(function(res) {
                const lastItem = res.body[res.body.length - 1];

                return chai.request('http://localhost:3000/api/v1')
                .delete('/category/' + lastItem.id)
                .then(function(delRes) {
                    console.log(delRes);
                    expect(delRes).to.have.status(200);
                });
            });
    });

});