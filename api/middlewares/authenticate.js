const jsonwebtoken = require('jsonwebtoken');

module.exports = (user) => {
    const userInfoWithoutPassword = Object.create(user);
    delete userInfoWithoutPassword.password;

    return jsonwebtoken.sign({
        data: userInfoWithoutPassword,
        // exp in seconds
        exp: Math.floor(Date.now() / 1000) - (60 * 60), // 60 seconds * 60 minutes = 1 hour
    }, 'm00ch3r');
};

