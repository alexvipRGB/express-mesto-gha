const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validationErrors } = require('../utils/validError');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    validationErrors(res);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
    }

    res.send(user);
  } catch (err) {
    validationErrors(res);
  }
};
const createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    if (!user) {
      res.status(404).send({ message: 'Пользователь не создан' });
    } else {
      res.status(201).send({
        name,
        about,
        avatar,
        email,
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).send({ message: 'Email уже используется' });
    } else {
      validationErrors(res);
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
    res.send(user);
  } catch (err) {
    validationErrors(res);
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
    res.send(user);
  } catch (err) {
    validationErrors(res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(401).send({ message: 'Неправильная почта или пароль' });
      return;
    }

    const token = jwt.sign({ _id: user._id }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY', {
      expiresIn: '7d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send({ message: 'Успешная аутентификация' });
  } catch (err) {
    validationErrors(res);
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
    }

    res.send(user);
  } catch (err) {
    validationErrors(res);
  }
};

module.exports = {
  getUsers, getUserById, createUser, updateUser, updateUserAvatar, login, getCurrentUser,
};
