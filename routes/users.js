const express = require('express');
const { celebrate, errors } = require('celebrate');
const auth = require('../middlewares/auth');

const router = express.Router();
const {
  getUsers,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
  login,
  createUser,
  getUserById,
} = require('../controllers/users');
const { userValidation, userUpdateValidation } = require('../utils/jobSchema');

router.post('/signin', celebrate(userValidation), login);
router.post('/signup', celebrate(userValidation), createUser);

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getCurrentUser);
router.get('/users/:userId', auth, celebrate(userValidation), getUserById);
router.patch('/users/me', auth, celebrate(userUpdateValidation), updateUser);

router.patch(
  '/users/me/avatar',
  auth,
  celebrate(userUpdateValidation),
  updateUserAvatar,
);

router.use(errors());

module.exports = router;
