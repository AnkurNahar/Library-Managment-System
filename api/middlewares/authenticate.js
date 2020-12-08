const userService = require('../../services/user');
const bookService = require('../../services/book');

async function isLibrarian(req, res, next) {
    const isLibrarian = await userService.isLibrarian(req.userId);
    if( isLibrarian.status !== 200 ){
        return res.status(500).json({msg: "Internal server error occured"});
    }
    if( !isLibrarian.librarian ){
        return res.status(401).json({msg: "Unauthorized Action"});
    }
    return next();
  }

  async function isLoggedIn(req, res, next) {
    const isLibrarian = await userService.isLibrarian(req.userId);
    if( isLibrarian.status !== 200 ){
        return res.status(500).json({msg: "Internal server error occured"});
    }
    if( !isLibrarian.librarian ){
        return res.status(401).json({msg: "Unauthorized Action"});
    }
    return next();
  }

  //to verify access token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).json({msg: "Unauthorized Action"});

  const data = userService.verifyAuthToken(token);
  if(!data.tokenValid){
    return res.status(401).json({msg: "Unauthorized Action"});
  }
  return next();
}

  async function isBookActive(req, res, next) {
    const isActive = await bookService.isBookActive(req.body.bookId);
    if( isActive.status !== 200 ){
        return res.status(500).json({msg: "Internal server error occured"});
    }
    if( !isActive.isActive ){
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