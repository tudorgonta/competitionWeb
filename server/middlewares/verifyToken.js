const jwt = require('jsonwebtoken');

// Retrieves a JWT token from header
function getTokenFromHeader(req) {
  // Get auth header value
  const authHeader = req.headers.authorization;
  // Check if auth header is undefined
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Get token
    var token = authHeader.slice(7); // Remove 'Bearer ' prefix
  }
  return token;
}

function verifyToken(role) {
  return (req, res, next) => {
    // Extract the token from the request headers, query parameters, or cookies
    const token = getTokenFromHeader(req);

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
  verifyTokenAdmin: verifyToken('admin'),
  getTokenFromHeader
};
