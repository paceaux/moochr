const Category = require('./category.model');
const UserInfo = require('./userInfo.model');
const Item = require('./item.model');

Category
    .sync()
    .then(() => console.log('Category Synchronized'));

UserInfo
    .sync()
    .then(() => console.log('User Synchronized'));

Item
    .sync()
    .then(() => console.log('Item Synchronized'));
