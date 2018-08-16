const chai = require('chai');
const { expect } = require('chai');
const bcrypt = require('bcrypt');
const { it, describe } = require('mocha');
const UserAuth = require('../models/user-auth.model');

const appUrl = 'http://localhost:3000/api/v1';
const endpoint = '/auth/';

chai.use(require('chai-http'));

const TestUser = {
    email: 'test-auth@crud.create.com',
    password: 'foobar',
};

const testUpdatedUser = {
    email: 'test-auth@crud.update.com',
    password: 'barfoo',
};

describe('endpoint is auth/register', ()=> {
    it('should add a user', () =>
        chai.request(appUrl)
            .post('/register')
            .send(TestUser)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object').to.have.any.keys('id', 'email', 'password');
            }));

    it('should should not let me add a duplicate a user', () =>
        chai.request(appUrl)
            .post(endpoint)
            .send(TestUser)
            .then(res => {
                expect(res);
                expect(res).to.not.have.status(200);
            }));
});

describe(`endpoint is auth/user`, function endpointTest() {
    this.timeout(5000);

    it.skip('should update a user', () =>
        chai.request(appUrl)
            .get(endpoint)
            .then((res) => {
                const addedUser = res.body.find(usr =>
                    (
                        usr.email === TestUser.email
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

    it.skip('should update a user password', () =>
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
});

describe('endpoint is auth/deleteuser', () => {
    it('should delete a user', async () => {
        const testUser = await UserAuth.find({ where: { email: TestUser.email } });
        const deleteResponse = await chai.request(appUrl)
            .delete('/auth/deleteuser')
            .send({ id: testUser.id });

        expect(deleteResponse);
        expect(deleteResponse).to.have.status(200);
    });
});

