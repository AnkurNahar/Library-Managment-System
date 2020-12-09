const userService = require('../../services/user');
const bookService = require('../../services/book');

async function isLibrarian(req, res, next) {
    const librarian = await userService.isLibrarian(req.userId);
    if( librarian.status !== 200 ){
        return res.status(500).json({msg: "Internal server error occured"});
    }
    if( !librarian.librarian ){
        return res.status(401).json({msg: "Unauthorized Action"});
    }
    return next();
  }

  async function isLoggedIn(req, res, next) {
    const loggedIn = await userService.isLoggedIn(req.userId);
    if( loggedIn.status !== 200 ){
        return res.status(500).json({msg: "Internal server error occured"});
    }
    if( !loggedIn.loginStatus ){
        return res.status(401).json({msg: "Not Logged In"});
    }
    return next();
  }

  //to verify access token
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).json({msg: "Unauthorized Action"});

  const data = await userService.verifyAuthToken(token);
  if(!data.tokenValid){
    return res.status(401).json({msg: "Unauthorized Action"});
  }
  req.userId = data.data.payload.id;
  req.email = data.data.payload.email;
  req.username = data.data.payload.username;
  req.librarian = data.data.payload.librarian;
  return next();
}

  async function isBookActive(req, res, next) {
    const isActive = await bookService.isBookActive(req.body.bookId);
    if( isActive.status !== 200 ){
        return res.status(500).json({msg: "Internal server error occured"});
    }
    if( isActive == null || !isActive.activeStatus ){
        return res.status(404).json({msg: "Book not available"});
    }
    return next();
  }

  module.exports = {
    isLibrarian,
    isLoggedIn,
    isBookActive,
    authenticateToken
  };