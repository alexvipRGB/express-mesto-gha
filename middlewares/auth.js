const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send({ message: 'Токен отсутствует' });
  }

  try {
    req.user = jwt.verify(token, 'R6yUJ9OwiJ0N0ELIiEIaO3OD');

    next();
  } catch (err) {
    return res.status(401).send({ message: 'Токен недействителен' });
  }
  return null;
};

module.exports = authMiddleware;
