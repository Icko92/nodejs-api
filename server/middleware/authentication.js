const jwt = require("jsonwebtoken");

authenticateToken = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  const authToken = req.headers.authorization;
  const token = authToken && authToken.split(" ")[1];
  if (token == null) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
