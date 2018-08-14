const { expect } = require('chai');
const Item = require('../../models/item.model');
const User = require('../../models/user-auth.model');
const UserData = require('../../models/user-data.model');

const loanTime = new Date();
const returnTime = new Date();

const TestItem = {
    name: 'circular saw',
    model_number: '43234 aa12',
    serial_number: '01234321',
    value: 0,
    is_loanable: false,
};

const TestUpdatedItem = {
    name: 'circular saw',
    model_number: '53234 bb12',
    serial_number: '23454321',
    value: 75.89,
    is_loanable: true,
};

const TestUserForItem = {
    email: 'user-item@blah.com',
    password: 'foobar',
};

const TestUserDataForLoan = {
    firstname: 'test user',
    lastname: 'for item',
    phone: '8884645555',
    street1: 'street 1',
    street2: 'street 2',
    city: 'somewhere',
    state: 'TX',
    country: 'USA',
};

const TestLoanedItem = {
    time_loaned: loanTime,
    time_due: new Date(returnTime.setMonth(loanTime.getMonth() + 1)),
    time_return: new Date(returnTime.setMonth(loanTime.getMonth() + 2)),
};

describe('tests the item model', () => {
    before((done) => {
        Item.sync({ force: true })
            .then(async () => {
                // create a test user
                const user = await User.create(TestUserForItem);
                // clone test user data
                const testUsrData = Object.create(TestUserDataForLoan);
                // set a real id into the cloned test user data
                testUsrData.user_auth_id = user.id;
                // create test user data
                const owner = await UserData.create(testUsrData);
                // clone a test item
                const testItem = TestItem;
                // set real user id in item data
                testItem.owner = owner.id;
                // create the real item
                await Item.create(testItem);

                done();
            })
            .catch(err => {
                done(err);
            });
    });
    it('Should find the item I created', async () => {
        const item = await Item.findOne({ where: { id: 1 } });

        expect(item).to.have.property('id');
        expect(item).to.have.property('name', TestItem.name);
    });

    it('should know who owns the thing', async () => {
        const item = await Item.findOne({ where: { id: 1 } });
        const user = await UserData.findOne({ where: { id: item.owner } });

        expect(user).to.have.property('firstname', TestUserDataForLoan.firstname);
        expect(user).to.have.property('lastname', TestUserDataForLoan.lastname);
    });

    it('should update the item ', async () => {
        const item = await Item.findOne({ where: { id: 1 } });

        const updatedItem = await item.update(TestUpdatedItem);

        expect(updatedItem).to.have.property('id', 1);
        expect(updatedItem).to.have.property('is_loanable', TestUpdatedItem.is_loanable);
        expect(updatedItem).to.have.property('value', TestUpdatedItem.value);
    });

    it('should give the item an borrower', async () => {
        const item = await Item.findOne({ where: { id: 1 } });
        const testLoanedItem = TestLoanedItem;
        testLoanedItem.borrower = 3;

        const updatedItem = await item.update(testLoanedItem);

        expect(updatedItem).to.have.property('time_loaned');
        expect(updatedItem).to.have.property('owner');
    });

    it('should delete by id', async () => {
        try {
            const item = await Item.destroy({ where: { id: 1 } });
            expect(item).to.equal(1);
        } catch (err) {
            console.log(err);
        }
    });
});
