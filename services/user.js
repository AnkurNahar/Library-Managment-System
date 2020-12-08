const jwt = require('jsonwebtoken');
const UserList = require('../models/user');
const bcrypt = require("bcrypt");

const userservice = {
  //to generate acccess token
  generateAccessToken: function (user) {
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "30d" });
    return token;
  },

  updateLoginStatus: async function (userId) {
    await UserList.updateOne({_id: userId}, {loginStatus: true})
  },

  encryptPassword: function (password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    return hash;
  },

  isLibrarian: async function (userId) {
    try {
      const user = await UserList.query().findOne({ _id: userId });
      return { status: 200, librarian: user.librarian};
    } catch {
        return { status: 500};
    }
  },

  isLoggedIn: async function (userId) {
    try {
      const user = await UserList.query().findOne({ _id: userId });
      return { status: 200, loginStatus: user.loginStatus };
    } catch {
        return { status: 500};
    }
  },

  verifyAuthToken: async function (token) {

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        return { tokenValid: true, data: decode };
    } catch {
        return { tokenValid: false };
    }
},

  loginUser: async function (userData) {
    try {
        const user = await UserList.findOne({email: userData.email});

        if(!user){ // if user dosent exist
            return {status: 401, message: 'user not found'};
       }

       //match password
       const matchPass = await bcrypt.compare(userData.password, user.password);

       if (!matchPass) {
 
        return {
            status: 400,
            msg: "Password does not match"
        };
       }

       const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
        librarian: user.librarian
       }

        const accessToken = this.generateAccessToken({payload});
        //update status logged in
        await this.updateLoginStatus( user._id );

      return { status: 200, accessToken: accessToken};
    } catch (err) {
      console.log(err);
      return { status: 500, msg: "Internal server error!" };
    }
  },

  logoutUser: async function (userId) {
    try {
        await UserList.updateOne({_id: userId}, {loginStatus: false})
        return { status: 200, message: "Logged Out Successfully"  };
    } catch (err) {
      return { status: 500, msg: "Internal server error!" };
    }
  },

  checkForEmail: async function (user) {
    try {
      const email = await UserList.query().findOne({ email: user.email });
      return email;
    } catch {
        return { status: 500};
    }
  },

  signupUser: async function (user) {
    try {

        //check for duplicate email
        const email = this.checkForEmail(user.email);
        if( email.status ) {
          return { status: 500, msg: "Internal server error!" };
        }else if( email ) {
            return { status: 400, msg: 'Email already in use' };
        }

          //encrypt password
          const hash = this.encryptPassword(user.password)

          //adding user
          if( user.librarian ) {
            await UserList.insertOne({
                userName: user.userName, 
                email: user.email,
                password: hash,
                librarian: true
            });
          } else {
            await UserList.insertOne({
                userName: user.userName, 
                email: user.email,
                password: hash
            });
          }

        return { status: 200, success: true, msg: 'Registration Successful!'};

    } catch (err) {
      console.log(err);
      return { status: 500, msg: "Internal server error!" };
    }
  },

};

module.exports = userservice;