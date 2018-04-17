const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const testCategory = {
    name: "test name",
    slug: "test-slug",
    parent: 3
};

const testUpdatedCategory = {
    "name": "updated test name",
    "slug": "updated-test-slug",
    "parent": "3"
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

    it('should update a category', function () {
        return chai.request('http://localhost:3000/api/v1')
            .get('/category/')
            .then(function(res) {
                const lastItem = res.body[res.body.length - 1];

                return chai.request('http://localhost:3000/api/v1')
                .put('/category/' + lastItem.id)
                .send(testUpdatedCategory)
                .then(function(updateRes) {
                    expect(updateRes).to.have.status(200);
                    expect(updateRes.body).to.be.an('array');
                    const lastItem = updateRes.body[updateRes.body.length - 1];
                    expect(updateRes).to.be.json;
                    expect(lastItem).to.include(testUpdatedCategory);
                });
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
                    expect(delRes).to.have.status(200);
                });
            });
    });

});