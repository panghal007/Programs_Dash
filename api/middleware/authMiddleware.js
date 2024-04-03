const authMiddleware = (req, res, next) => {
    next();
  };
  
  module.exports = authMiddleware;
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization; // Assuming token is sent in the Authorization header
//     if (!token) {
//         return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ error: "Unauthorized: Invalid token" });
//         }
//         req.user = decoded; // Set user information in the request object
//         next(); // Call next middleware
//     });
// };

// module.exports = authMiddleware;
