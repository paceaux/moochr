const crudOp = 'logout';

module.exports = async function logout(ctx, next) {
    console.log('isAuthenticated?', ctx.isAuthenticated());
    console.log('logging out');
    console.log(ctx);

    ctx.logout();
    ctx.body = { success: true };
    ctx.status = 200;
    next();
};
