const chai = require('chai');
const expect = require('chai').expect;
const appUrl = 'http://localhost:3000/api/v1';
const endpoint = '/user/';

chai.use(require('chai-http'));

const testUser = {
	firstname: "Test",
	lastname: "Taco",
	email: "test@whatevs.com",
	phone: "8884645555",
	street1: "street 1",
	street2: "street 2",
	city: "somewhere",
	state: "TX",
	country: "USA"
};

const testUpdatedUser = {
	firstname: "Update Test",
	lastname: "Taco",
	email: "test@whatevs.com",
	phone: "7774646666",
	street1: "street 1",
	street2: "street 2",
	city: "somewhere else",
	state: "IL",
	country: "USA"
};

describe(`API endpoint ${endpoint}` , function (){
    this.timeout(5000);

    before(function () {

    });

    after(function () {

    });

    it('should return some users', function () {
        return chai.request(appUrl)
            .get(endpoint)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

    it('should add a user', function () {
        return chai.request(appUrl)
            .post(endpoint)
            .send(testUser)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object').to.have.any.keys('id', 'firstname', 'lastname', 'email', 'city');
                console.log(res);
            });
    });

    it('should return one user if I request by id', function () {
        return chai.request(appUrl)
            .get(endpoint)
            .then(function (res) {
                const addedUser = res.body.find(usr => {
                    return (
                        usr.firstname == testUser.firstname &&
                        usr.lastname == testUser.lastname &&
                        usr.email == testUser.email &&
                        usr.phone == testUser.phone &&
                        usr.city == testUser.city &&
                        usr.country == testUser.country
                    );
                });
            return chai.request(appUrl)
                .get(endpoint + addedUser.id)
                .then(function (userRes) {
                    expect(userRes).to.have.status(200);
                    expect(userRes).to.be.json;
                    expect(userRes.body).to.be.an('object');
                    expect(userRes.body).to.include(testUser);
                });
            });
    });

    it('should update a user', function () {
        return chai.request(appUrl)
            .get(endpoint)
            .then(function (res) {
                const addedUser = res.body.find(usr => {
                    return (
                        usr.firstname == testUser.firstname &&
                        usr.lastname == testUser.lastname &&
                        usr.email == testUser.email &&
                        usr.phone == testUser.phone &&
                        usr.city == testUser.city &&
                        usr.country == testUser.country
                    );
                });

                return chai.request(appUrl)
                    .put(endpoint + addedUser.id)
                    .send(testUpdatedUser)
                    .then(function(updateRes) {
                        expect(updateRes).to.have.status(200);
                        expect(updateRes.body).to.be.an('object');
                        expect(updateRes).to.be.json;
                        expect(updateRes.body).to.have.property('firstname', testUpdatedUser.firstname);
                        expect(updateRes.body).to.have.property('phone', testUpdatedUser.phone);
                        expect(updateRes.body).to.have.property('city', testUpdatedUser.city);
                        expect(updateRes.body).to.have.property('state', testUpdatedUser.state);
                    });
            });
    });

    it('should delete a user', function () {
        return chai.request(appUrl)
            .get(endpoint)
            .then(function(res) {
                const lastItem = res.body.find(usr => {
                    return (
                        usr.firstname == testUpdatedUser.firstname &&
                        usr.lastname == testUpdatedUser.lastname &&
                        usr.email == testUpdatedUser.email &&
                        usr.phone == testUpdatedUser.phone &&
                        usr.city == testUpdatedUser.city &&
                        usr.country == testUpdatedUser.country
                    );
                });

                return chai.request(appUrl)
                .delete(endpoint + lastItem.id)
                .then(function(delRes) {
                    expect(delRes).to.have.status(200);
                });
            });
    });

});