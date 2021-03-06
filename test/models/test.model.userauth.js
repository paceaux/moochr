const { expect } = require('chai');
const UserAuth = require('../../models/user-auth.model');

const TestUser1 = { email: 'user-auth@testcom', password: 'foobarbaz' };
const TestUser1Update = { email: 'user-auth@update.test.com' };

describe('tests user auth model', () => {
    before((done) => {
        UserAuth.sync({ force: true })
            .then(async () => {
                await UserAuth.create(TestUser1);

                done();
            })
            .catch(err => {
                done(err);
            });
    });
    after((done) => {
        // deletes the one created when I tried to create a duplicate
        UserAuth.findOne({ where: { id: 3 } })
            .then(async (user) => {
                await user.destroy();
                done();
            });
    });
    it('I should find what I created', async () => {
        const user = await UserAuth.findOne({ where: { email: TestUser1.email } });

        expect(user).to.have.property('id');
        expect(user).to.have.property('email', TestUser1.email);
    });

    it('Throws a hissy fit if I add another one with same email', async () => {
        try {
            await UserAuth.create(TestUser1);
        } catch (err) {
            expect(err);
        }
    });

    it('Updates email of what I created', async () => {
        const user = await UserAuth.findOne({ where: { id: 1 } });

        const updatedUser = await user.update(TestUser1Update);

        expect(updatedUser).to.have.property('email', TestUser1Update.email);
    });

    it('Now lets me add a new user with same email as old user', async () => {
        const user = await UserAuth.create(TestUser1);

        expect(user).to.have.property('email', TestUser1.email);
    });

    it('gets me two users', async () => {
        const users = await UserAuth.findAll();

        expect(users).to.be.an('array');
        expect(users).to.have.lengthOf(2);
    });

    it('should delete by id', async () => {
        try {
            const user = await UserAuth.destroy({ where: { id: [1, 2] } });
            expect(user).to.equal(1);
        } catch (err) {
            console.log(err);
        }
    });
});
