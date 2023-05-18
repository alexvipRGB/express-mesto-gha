const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send({ message: 'Токен отсутствует' });
  }

  try {
    req.user = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY');

    next();
  } catch (err) {
    return res.status(401).send({ message: 'Токен недействителен' });
  }
  return null;
};

module.exports = authMiddleware;
