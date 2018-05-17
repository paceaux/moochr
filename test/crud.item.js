const chai = require('chai');
const expect = require('chai').expect;
const appUrl = 'http://localhost:3000/api/v1';
const endpoint = '/item/';

chai.use(require('chai-http'));

const loanTime = new Date();
const returnTime = new Date();

const testItem = {
    name: "circular saw",
    owner: "4",
    model_number: "43234 aa12",
    serial_number: "01234321",
    value: 0,
    is_loanable: false
};

const testUpdatedItem = {
    name: "circular saw",
    model_number: "53234 bb12",
    serial_number: "23454321",
    value: 75.89,
    is_loanable: true
};

const testLoanedItem = {
    borrower: '5',
    time_loaned: loanTime,
    time_due: new Date(returnTime.setMonth(loanTime.getMonth() + 1)),
    time_return: new Date(returnTime.setMonth(loanTime.getMonth() + 2)),
};

describe(`API endpoint ${endpoint}` , function (){
    this.timeout(5000);

    before(function () {

    });

    after(function () {

    });

    it('should return some items', function () {
        return chai.request(appUrl)
            .get(endpoint)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

    it('should add an item', function () {
        return chai.request(appUrl)
            .post(endpoint)
            .send(testItem)
            .then(function(res) {

                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object').to.have.any.keys('id', 'name', 'owner', 'model_number', 'serial_number');
            });
    });

    it('should return one item if I request by id', function () {
        return chai.request(appUrl)
            .get(endpoint)
            .then(function (res) {
                const addedItem = res.body.find(item => {
                    return (
                        item.name == testItem.name &&
                        item.owner == testItem.owner &&
                        item.model_number == testItem.model_number &&
                        item.serial_number == testItem.serial_number &&
                        item.value == testItem.value
                    );
                });
            return chai.request(appUrl)
                .get(endpoint + addedItem.id)
                .then(function (itemRes) {
                    expect(itemRes).to.have.status(200);
                    expect(itemRes).to.be.json;
                    expect(itemRes.body).to.be.an('object');
                    expect(itemRes.body).to.include(testItem);
                });
            });
    });

    it('should update an Item', function () {
        return chai.request(appUrl)
            .get(endpoint)
            .then(function (res) {
                const addedItem = res.body.find(item => {
                    return (
                        item.name == testItem.name &&
                        item.owner == testItem.owner &&
                        item.model_number == testItem.model_number &&
                        item.serial_number == testItem.serial_number &&
                        item.value == testItem.value
                    );
                });

                return chai.request(appUrl)
                    .put(endpoint + addedItem.id)
                    .send(testUpdatedItem)
                    .then(function(updateRes) {
                        expect(updateRes).to.have.status(200);
                        expect(updateRes.body).to.be.an('object');
                        expect(updateRes).to.be.json;
                        expect(updateRes.body).to.include({model_number: testUpdatedItem.model_number});
                        expect(updateRes.body).to.include({serial_number: testUpdatedItem.serial_number});
                        expect(updateRes.body).to.include({value: testUpdatedItem.value});
                        expect(updateRes.body).to.include({is_loanable: testUpdatedItem.is_loanable});

                    });
            });
    });

    it('should loan an item and return good properties', function () {
        return chai.request(appUrl)
            .get(endpoint)
            .then(function (res) {
                const addedItem = res.body.find(item => {
                    return (
                        item.name == testItem.name &&
                        item.owner == testItem.owner &&
                        item.model_number == testUpdatedItem.model_number &&
                        item.serial_number == testUpdatedItem.serial_number &&
                        item.value == testUpdatedItem.value &&
                        item.is_loanable == testUpdatedItem.is_loanable
                    );
                });

                return chai.request(appUrl)
                    .put(endpoint + addedItem.id)
                    .send(testLoanedItem)
                    .then(function(updateRes) {
                        const result = updateRes.body;
                        expect(updateRes).to.have.status(200);
                        expect(result).to.be.an('object');
                        expect(updateRes).to.be.json;
                        expect(result).to.have.property('borrower', testLoanedItem.borrower);
                        expect(result).to.have.property('time_loaned');
                        expect(result).to.have.property('time_due');
                        expect(result).to.have.property('time_return');
                    });
            });
    });

    it('should loan an item and return good time values', function () {
        return chai.request(appUrl)
            .get(endpoint)
            .then(function (res) {
                const addedItem = res.body.find(item => {
                    return (
                        item.name == testItem.name &&
                        item.owner == testItem.owner &&
                        item.model_number == testUpdatedItem.model_number &&
                        item.serial_number == testUpdatedItem.serial_number &&
                        item.value == testUpdatedItem.value &&
                        item.is_loanable == testUpdatedItem.is_loanable
                    );
                });

                return chai.request(appUrl)
                    .put(endpoint + addedItem.id)
                    .send(testLoanedItem)
                    .then(function(updateRes) {
                        const result = updateRes.body;
                        const timeLoaned = new Date(result.time_loaned);
                        const timeReturn = new Date(result.time_return);
                        const timeDue = new Date(result.time_due);
                        expect(updateRes).to.have.status(200);
                        expect(result).to.be.an('object');
                        expect(updateRes).to.be.json;
                        expect(timeLoaned.toISOString()).to.equal(testLoanedItem.time_loaned.toISOString());
                        expect(timeReturn.toISOString()).to.equal(testLoanedItem.time_return.toISOString());
                        expect(timeDue.toISOString()).to.equal(testLoanedItem.time_due.toISOString());
                    });
            });
    });

    it('should delete an item', function () {
        return chai.request(appUrl)
            .get(endpoint)
            .then(function(res) {
                const lastItem = res.body.find(item => {
                    return (
                        item.name == testItem.name &&
                        item.owner == testItem.owner &&
                        item.borrower == testLoanedItem.borrower
                    );
                });
                return chai.request(appUrl)
                .delete(endpoint + lastItem.id)
                .then(function(delRes) {
                    expect(delRes).to.have.status(200);
                });
            });
    });

    it('should get items for one specific category', function() {
        return chai.request(appUrl)
            .get(endpoint + '?category=1')
            .then(function (res) {
                expect(res).to.have.deep.property('id', 1);
            });
    });

    it('should get items for multiple categories', function() {
        return chai.request(appUrl)
            .get(endpoint + '?category=1&category=2')
            .then(function (res) {
                expect(res).to.have.deep.property('id', 1);
                expect(res).to.have.deep.property('id', 2);
            });
    });

    it('should get items for one specific user', function() {
        return chai.request(appUrl)
            .get(endpoint + '?owner=1')
            .then(function (res) {
                expect(res).to.have.deep.property('id',1);
            });
    });

});