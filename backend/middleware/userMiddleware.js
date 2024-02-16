const jwt = require("jsonwebtoken");
const JWT_SECRET="jwtsecret"

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      return res.json({ error: "Unauthorized Access" });
    }
    const decoded = jwt.verify(authHeader, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.json({ error });
  }
};

module.exports = authMiddleware;
