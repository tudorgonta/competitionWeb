const jwt = require('jsonwebtoken');

function verifyToken(role) {
  return (req, res, next) => {
    // Extract the token from the request headers, query parameters, or cookies
    const token = req.headers.authorization || req.query.token || req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Attach the decoded token to the request object for future use
      req.decodedToken = decodedToken;

      // Check the role
      if (decodedToken.role !== role) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      next();
    });
  };
}

module.exports = {
  verifyTokenUser: verifyToken('user'),
  verifyTokenAdmin: verifyToken('admin')
};
