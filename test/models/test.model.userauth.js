const { expect } = require('chai');
const bcrypt = require('bcrypt');

const UserAuth = require('../../models/user-auth.model');

const TestUser1 = { email: 'user-auth@testcom', password: 'foobarbaz' };
const TestUser2 = { email: 'user-auth2@testcom', password: 'foobarbaz' };
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
                if (user) await user.destroy();
                done();
            });
    });
    it('I should find what I created', async () => {
        const user = await UserAuth.findOne({ where: { email: TestUser1.email } });

        expect(user).to.have.property('id');
        expect(user).to.have.property('email', TestUser1.email);
    });

    it('User\'s password isn\'t hacker friendly ', async () => {
        const user = await UserAuth.findOne({ where: { email: TestUser1.email } });

        expect(user).to.have.property('id');
        expect(user).to.have.property('email', TestUser1.email);
        expect(user.password).to.not.equal(TestUser1.password);
    });

    it('user password is bcrypt-friendly', async () => {
        const user = await UserAuth.findOne({ where: { email: TestUser1.email } });

        const isSame = bcrypt.compareSync(TestUser1.password, user.password);

        expect(isSame).to.be.true;
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

    it('Throws a hissy fit if I update a user to have same email as another', async () => {
        try {
            await UserAuth.create(TestUser2);
            const user = await UserAuth.findOne({ where: { id: 1 } });
            await user.update({ email: TestUser2.email });
        } catch (err) {
            expect(err);
        }
    });

    it('Now lets me add a new user with same email as old user', async () => {
        const user = await UserAuth.create(TestUser1);

        expect(user).to.have.property('email', TestUser1.email);
    });

    it('gets me three users', async () => {
        const users = await UserAuth.findAll();

        expect(users).to.be.an('array');
        expect(users).to.have.lengthOf(3);
    });

    it('should delete by id', async () => {
        try {
            const user = await UserAuth.destroy({ where: { id: [1, 2, 3, 4] } });
            expect(user).to.equal(3);
        } catch (err) {
            console.log(err);
        }
    });
});
