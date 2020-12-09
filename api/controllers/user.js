const userService = require('../../services/user');

const loginUser = async (req, res) => {

    const userInfo = await userService.loginUser(req.body);
    return res.status(userInfo.status).json(userInfo);
}

const signupUser = async (req, res) => {

    const userSignup = await userService.signupUser(req.body);
    return res.status(userSignup.status).json(userSignup);
}

const logoutUser = async (req, res) => {

    const userLogout = await userService.logoutUser(req.userId);
    return res.status(userLogout.status).json(userLogout);
}



module.exports = {
    loginUser,
    signupUser,
    logoutUser
}