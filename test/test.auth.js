const chai = require('chai');
const { expect } = require('chai');
const bcrypt = require('bcrypt');
const { it, describe } = require('mocha');
const UserAuth = require('../models/user-auth.model');

const appUrl = 'http://localhost:3000/api/v1';

chai.use(require('chai-http'));

const TestUser = {
    email: 'test-auth@auth.login.com',
    password: 'foobar',
};

const TestUserBadEmail = {
    email: 'test-dud@auth.login.com',
    password: 'foobar',
};

const TestUserBadPwd = {
    email: 'test-auth@auth.login.com',
    password: 'barfoo',
};

const TestUserMissing = {
    email: 'test-auth@auth.login.com',
};

describe('testing login', () => {
    before((done) => {
        UserAuth.sync({ force: true })
            .then(async () => {
                await UserAuth.create(TestUser);

                done();
            })
            .catch(err => {
                done(err);
            });
    });

    after((done) => {
        UserAuth.findOne({ where: { email: TestUser.email } })
            .then(async (user) => {
                if (user) await user.destroy();
                done();
            });
    });
    it('should successfully log in a user with correct password', async () => {
        const loginResponse = await chai.request(appUrl)
            .post('/login')
            .send(TestUser);

        expect(loginResponse);
        expect(loginResponse).to.have.status(201);
        expect(loginResponse.body).to.have.property('token');
    });

    it('bad email gets a specific error message', async () => {
        const loginResponse = await chai.request(appUrl)
            .post('/login')
            .send(TestUserBadEmail);

        expect(loginResponse);
        expect(loginResponse).to.have.status(401);
        expect(loginResponse.body).to.have.property('err', 'UserNotFound');
    });
    it('bad password gets a specific error message', async () => {
        const loginResponse = await chai.request(appUrl)
            .post('/login')
            .send(TestUserBadPwd);

        expect(loginResponse);
        expect(loginResponse).to.have.status(401);
        expect(loginResponse.body).to.have.property('err', 'PasswordMismatch');
    });
    it('missing credentials get a specific message', async () => {
        const loginResponse = await chai.request(appUrl)
            .post('/login')
            .send(TestUserMissing);

        expect(loginResponse);
        expect(loginResponse).to.have.status(401);
        expect(loginResponse.body).to.have.property('err', 'MissingCredentials');
    });
});
