const jsonwebtoken = require('jsonwebtoken');

module.exports = (user) => {
    const userInfoWithoutPassword = Object.create(user);
    delete userInfoWithoutPassword.password;

    return jsonwebtoken.sign({
        data: userInfoWithoutPassword,
        exp: Math.floor(Date.now() / 1000) - (60 * 120), // 60 seconds * 60 minutes = 2 hours
    }, 'm00ch3r'); // TODO: DON'T HARDCODE THIS!
};

