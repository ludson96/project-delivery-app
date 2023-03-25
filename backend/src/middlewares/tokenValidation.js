const { verifyToken } = require('../auth/jwtFunctions');

const condition = (a, b, c, d) => a && b && c && d;

const tokenValidation = (req, res, next) => {
  const verify = verifyToken(req.headers.authorization);
  if (!condition(verify.id, verify.name, verify.email, verify.role)) { 
    return res.status(401).json({ error: 'Invalid token!' }); 
  }
  next();
};

module.exports = {
  tokenValidation,
};