const Category = require('./category.model');
const User = require('./user-data.model');
const UserAuth = require('./user-auth.model');
const Item = require('./item.model');

async function createModels() {
    await Category
        .sync({ force: true })
        .then(() => console.log('Category Synchronized'))
        .catch(err => console.log(err));

    await UserAuth
        .sync({ force: true })
        .then(() => console.log('User Synchronized'))
        .catch(err => console.log(err));

    await User
        .sync({ force: true })
        .then(() => console.log('User Data Synchronized'))
        .catch(err => console.log(err));

    await Item
        .sync({ force: true })
        .then(() => console.log('Item Synchronized'))
        .catch(err => console.log(err));

    process.exit();
}

createModels();
