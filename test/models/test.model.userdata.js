const { expect } = require('chai');
const UserData = require('../../models/user-data.model');
const User = require('../../models/user-auth.model');

const TestUserModel = {
    email: 'fooeyb@r.com',
    password: 'foobar',
};

const TestUser1 = {
    firstname: 'Test',
    lastname: 'Taco',
    email: 'test@whatevs.com',
    password: 'foobar',
    phone: '8884645555',
    street1: 'street 1',
    street2: 'street 2',
    city: 'somewhere',
    state: 'TX',
    country: 'USA',
};

const TestUser1Update = {
    firstname: 'Update Test',
    lastname: 'Taco',
    email: 'test@whatevs.com',
    password: 'barfoo',
    phone: '7774646666',
    street1: 'street 1',
    street2: 'street 2',
    city: 'somewhere else',
    state: 'IL',
    country: 'USA',
};

describe('tests user data model', () => {
    before((done) => {
        UserData.sync({ force: true })
            .then(async () => {
                const user = await User.create(TestUserModel);
                TestUser1.user_auth_id = user.id;
                await UserData.create(TestUser1);

                done();
            })
            .catch(err => {
                done(err);
            });
    });
    after((done) => {
        User.findOne({ where: { email: TestUserModel.email } })
            .then(user => {
                user.destroy();
                done();
            });
    });
    it('I should find what I created', async () => {
        const user = await UserData.findOne({ where: { id: 1 } });

        expect(user).to.have.property('id');
        expect(user).to.have.property('firstname', TestUser1.firstname);
        expect(user).to.have.property('lastname', TestUser1.lastname);
        expect(user).to.have.property('phone', TestUser1.phone);
        expect(user).to.have.property('city', TestUser1.city);
        expect(user).to.have.property('user_auth_id', TestUser1.user_auth_id);
    });

    it('Updates city and phone of what I created', async () => {
        const user = await UserData.findOne({ where: { id: 1 } });

        const updatedUser = await user.update(TestUser1Update);

        expect(updatedUser).to.have.property('city', TestUser1Update.city);
        expect(updatedUser).to.have.property('phone', TestUser1Update.phone);
    });

    it('should throw a hissy fit if I add user data without a user', async () => {
        try {
            const newTestUser = Object.create(TestUser1);
            newTestUser.user_auth_id = 99999;
            const newUserData = await UserData.create(newTestUser);
            console.log(newUserData);
        } catch (err) {
            expect(err);
        }
    });

    it('should delete by id', async () => {
        try {
            const user = await UserData.destroy({ where: { id: [1, 2] } });
            expect(user).to.equal(1);
        } catch (err) {
            console.log(err);
        }
    });
});
