const User = require('../models/user');
const { validationErrors } = require('../utils/validError');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    if (!name || !about || !avatar) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    const user = await User.create({ name, about, avatar });
    res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      validationErrors(err, res);
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    if (!name || !about) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      validationErrors(err, res);
    } else if (err.name === 'CastError') {
      res.status(400).send({ message: 'Ошибка валидации' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!avatar) {
      res.status(400).send({ message: 'Переданы некорректные данные' });
      return;
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      validationErrors(err, res);
    } else if (err.name === 'CastError') {
      res.status(400).send({ message: 'Ошибка валидации' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    }
  }
};

module.exports = {
  getUsers, getUserById, createUser, updateUser, updateUserAvatar,
};
