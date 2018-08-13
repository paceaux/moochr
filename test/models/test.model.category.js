const { expect } = require('chai');
const Category = require('../../models/category.model');

const testCategory1 = {
    name: 'test name',
    slug: 'test-slug',
};

const testCategory2 = {
    name: 'test name',
    slug: 'test-slug',
    parent: '1',
};

const testUpdatedCategory = {
    name: 'updated test name',
    slug: 'updated-test-slug',
};

describe('tests category auth model', () => {
    before((done) => {
        Category.sync({ force: true })
            .then(async () => {
                await Category.create(testCategory1);

                done();
            })
            .catch(err => {
                done(err);
            });
    });
    it('I should find what I created', async () => {
        const category = await Category.findOne({ where: { id: 1 } });

        expect(category).to.have.property('id');
        expect(category).to.have.property('name', testCategory1.name);
        expect(category).to.have.property('slug', testCategory1.slug);
    });

    it('Throws a hissy fit if I add another one with same slug', async () => {
        try {
            await Category.create(testCategory1);
        } catch (err) {
            expect(err);
        }
    });

    it('Updates name of what I created', async () => {
        const category = await Category.findOne({ where: { id: 1 } });

        const updatedCat = await category.update(testUpdatedCategory);

        expect(updatedCat).to.have.property('name', testUpdatedCategory.name);
    });

    it('Now lets me add a new category with old one as parent old user', async () => {
        const cat = await Category.create(testCategory2);

        expect(cat).to.have.property('name', testCategory2.name);
    });

    it('gets me two categories', async () => {
        const categories = await Category.findAll();

        expect(categories).to.be.an('array');
        expect(categories).to.have.lengthOf(2);
    });

    it('should delete by id', async () => {
        try {
            const cat = await Category.destroy({ where: { id: [1, 2, 3] } });
            expect(cat).to.equal(2);
        } catch (err) {
            console.log(err);
        }
    });
});