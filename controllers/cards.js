const Card = require('../models/card');
const validationErrors = require('../utils/validError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    validationErrors(res);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    if (!card) {
      next(new NotFoundError('Карточка не найдена'));
    } else {
      res.status(201).send(card);
    }
  } catch (err) {
    if (err.name === 'ValidationErrors') {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
    } else {
      next(err);
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      next(new NotFoundError('Карточка не найдена'));
      return;
    }
    if (card.owner.toString() !== userId) {
      next(new ForbiddenError('У вас нет прав на удаление этой карточки'));
      return;
    }

    await Card.findByIdAndRemove(cardId);

    res.send({ message: 'Карточка успешно удалена' });
    return;
  } catch (err) {
    validationErrors(res);
  }
};

const addLike = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      next(new NotFoundError('Карточка не найдена'));
      return;
    }

    res.send(card);
  } catch (err) {
    validationErrors(res);
  }
};

const removeLike = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      next(new NotFoundError('Карточка не найдена'));
      return;
    }

    res.send(card);
  } catch (err) {
    validationErrors(res);
  }
};

module.exports = {
  getCards, createCard, deleteCard, addLike, removeLike,
};
