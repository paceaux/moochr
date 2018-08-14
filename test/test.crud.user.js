const chai = require('chai');
const { expect } = require('chai');
const { it, describe } = require('mocha');

const appUrl = 'http://localhost:3000/api/v1';
const endpoint = '/user/';

chai.use(require('chai-http'));

const testUser = {
    firstname: 'Test',
    lastname: 'Taco',
    phone: '8884645555',
    street1: 'street 1',
    street2: 'street 2',
    city: 'somewhere',
    state: 'TX',
    country: 'USA',
};

const testUpdatedUser = {
    firstname: 'Update Test',
    lastname: 'Taco',
    phone: '7774646666',
    street1: 'street 1',
    street2: 'street 2',
    city: 'somewhere else',
    state: 'IL',
    country: 'USA',
};

describe(`API endpoint ${endpoint}`, function () {
    this.timeout(5000);

    it('should return some users', () =>
         chai.request(appUrl)
            .get(endpoint)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            }));

    it('should add a user', () =>
        chai.request(appUrl)
            .post(endpoint)
            .send(testUser)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object').to.have.any.keys('id', 'firstname', 'lastname', 'city', 'password');
            }));

    it('should return one user if I request by id', () =>
        chai.request(appUrl)
            .get(endpoint)
            .then(function (res) {
                const addedUser = res.body.find(usr =>
                    (
                        usr.firstname == testUser.firstname &&
                        usr.lastname == testUser.lastname &&
                        usr.phone == testUser.phone &&
                        usr.city == testUser.city &&
                        usr.country == testUser.country
                    )
                );
            return chai.request(appUrl)
                .get(endpoint + addedUser.id)
                .then(function (userRes) {
                    const userData = userRes && userRes.body;
                    expect(userRes).to.have.status(200);
                    expect(userRes).to.be.json;
                    expect(userData).to.have.property('firstname', testUser.firstname);
                    expect(userData).to.have.property('lastname', testUser.lastname);
                    expect(userData).to.have.property('phone', testUser.phone);
                    expect(userData).to.have.property('city', testUser.city);
                    expect(userData).to.have.property('country', testUser.country);
                });
            })
    );


    it('should update a user', () =>
        chai.request(appUrl)
            .get(endpoint)
            .then(function (res) {
                const addedUser = res.body.find(usr =>
                    (
                        usr.firstname == testUser.firstname &&
                        usr.lastname == testUser.lastname &&
                        usr.phone == testUser.phone &&
                        usr.city == testUser.city &&
                        usr.country == testUser.country
                    ));

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
            })
    );

    it('should delete a user', () =>
        chai.request(appUrl)
            .get(endpoint)
            .then((res) => {
                const lastItem = res.body.find(usr =>
                    (
                        usr.firstname == testUpdatedUser.firstname &&
                        usr.lastname == testUpdatedUser.lastname &&
                        usr.phone == testUpdatedUser.phone &&
                        usr.city == testUpdatedUser.city &&
                        usr.country == testUpdatedUser.country
                    ));

                return chai.request(appUrl)
                    .delete(endpoint + lastItem.id)
                    .then(function(delRes) {
                        expect(delRes).to.have.status(200);
                    });
            })
    )
});

