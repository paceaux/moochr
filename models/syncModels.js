const Category = require('./category.model');
const User = require('./user.model');
const Item = require('./item.model');

Category
    .sync()
    .then(() => console.log('Category Synchronized'));

User
    .sync()
    .then(() => console.log('User Synchronized'));

Item
    .sync()
    .then(() => console.log('Item Synchronized'));
