const chai = require('chai');
const { expect } = require('chai');
const bcrypt = require('bcrypt');
const { it, describe } = require('mocha');

const appUrl = 'http://localhost:3000/api/v1';
const endpoint = '/auth/';

chai.use(require('chai-http'));

const testUser = {
    email: 'test-auth@crud.create.com',
    password: 'foobar',
};

const testUpdatedUser = {
    email: 'test-auth@crud.update.com',
    password: 'barfoo',
};

describe(`API endpoint ${endpoint}`, function endpointTest() {
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
                expect(res.body).to.be.an('object').to.have.any.keys('id', 'email', 'password');
            }));

    it('should should not let me add a duplicate a user', () =>
        chai.request(appUrl)
            .post(endpoint)
            .send(testUser)
            .then(res => {
                expect(res);
                expect(res).to.be.json;
                expect(res).to.not.have.status(200);
            }));

    it('should return one user if I request by id', () =>
        chai.request(appUrl)
            .get(endpoint)
            .then((res) => {
                const addedUser = res.body.find(usr =>
                    (
                        usr.email === testUser.email
                    ));
                return chai.request(appUrl)
                    .get(endpoint + addedUser.id)
                    .then((userRes) => {
                        const userData = userRes && userRes.body;

                        expect(userRes).to.have.status(200);
                        expect(userRes).to.be.json;
                        expect(userData).to.have.property('email', testUser.email);
                        expect(userData).to.have.property('password');
                    });
            }));

    it('should update a user', () =>
        chai.request(appUrl)
            .get(endpoint)
            .then((res) => {
                const addedUser = res.body.find(usr =>
                    (
                        usr.email === testUser.email
                    ));

                return chai.request(appUrl)
                    .put(endpoint + addedUser.id)
                    .send(testUpdatedUser)
                    .then((updateRes) => {
                        expect(updateRes).to.have.status(200);
                        expect(updateRes.body).to.be.an('object');
                        expect(updateRes).to.be.json;
                    });
            }));

    it('should update a user password', () =>
        chai.request(appUrl)
            .get(endpoint)
            .then((res) => {
                const addedUser = res.body.find(usr =>
                    (
                        usr.email === testUpdatedUser.email
                    ));

                return chai.request(appUrl)
                    .put(endpoint + addedUser.id)
                    .send(testUpdatedUser)
                    .then(updateRes => {
                        const userData = updateRes && updateRes.body;

                        expect(updateRes).to.have.status(200);
                        expect(updateRes.body).to.be.an('object');
                        expect(updateRes).to.be.json;

                        const isSame = bcrypt.compareSync(testUpdatedUser.password, userData.password);

                        expect(isSame).to.be.true;
                    });
            }));

    it('should delete a user', () =>
        chai.request(appUrl)
            .get(endpoint)
            .then((res) => {
                const lastItem = res.body.find(usr =>
                    (
                        usr.email === testUpdatedUser.email
                    ));

                return chai.request(appUrl)
                    .delete(endpoint + lastItem.id)
                    .then((delRes) => {
                        expect(delRes).to.have.status(200);
                    });
            }));
});

