const Category = require('./category.model');
const UserInfo = require('./userInfo.model');
const User = require('./user.model');
const Item = require('./item.model');

Category
    .sync()
    .then(() => console.log('Category Synchronized'));

UserInfo
    .sync()
    .then(() => console.log('UserInfo Synchronized'));

Item
    .sync()
    .then(() => console.log('Item Synchronized'));

User
    .sync()
    .then(() => console.log('User Synchronized'));
