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

const TestUserUpdatedEmail = {
    email: 'test-auth@crud.update.com',
};

const TestUserUpdatedPassword = {
    password: 'barfoo',
};

describe('endpoint is auth/register', ()=> {
    it('should add a user', () =>
        chai.request(appUrl)
            .post('/register')
            .send(TestUser)
            .then(res => {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object').to.have.any.keys('id', 'email');
                expect(res.body).to.not.have.property('password');
                expect(res.body).to.have.any.keys('token');
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

describe('endpoint is auth/user/:id', function endpointTest() {
    this.timeout(5000);

    it('should update a user', async () => {
        const testUser = await UserAuth.find({ where: { email: TestUser.email } });

        const updateResult = await chai.request(appUrl)
            .put(`/auth/user/${testUser.id}`)
            .send(TestUserUpdatedEmail);

            expect(updateResult);
            expect(updateResult).to.have.status(200);

    });



    it('should update a user password', async () => {
        const userInDb = await UserAuth.find({ where: { email: TestUserUpdatedEmail.email } });

        await chai.request(appUrl)
            .put(`/auth/user/${userInDb.id}`)
            .send(TestUserUpdatedPassword);

        const userInDbAfterUpdate = await UserAuth.find({ where: { email: TestUserUpdatedEmail.email } });

        const isSame = bcrypt.compareSync(TestUserUpdatedPassword.password, userInDbAfterUpdate.password);

        expect(isSame).to.be.true;
    });
});

describe('endpoint is auth/user/:id', () => {
    it('should delete a user', async () => {
        const testUser = await UserAuth.find({ where: { email: TestUserUpdatedEmail.email } });
        const deleteResponse = await chai.request(appUrl)
            .delete(`/auth/user/${testUser.id}`)
            .send({ destroyData: true });

        expect(deleteResponse);
        expect(deleteResponse).to.have.status(200);
    });
});

