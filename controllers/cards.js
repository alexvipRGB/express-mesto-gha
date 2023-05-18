const Card = require('../models/card');
const { validationErrors } = require('../utils/validError');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    validationErrors(res);
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    if (!card) {
      res.status(404).send({ message: 'Карточка не создана' });
    } else {
      res.status(201).send(card);
    }
  } catch (err) {
    validationErrors(res);
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;
    const card = await Card.findByIdAndRemove(cardId);
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    if (card.owner.toString() !== userId) {
      res.status(403).send({ message: 'У вас нет прав на удаление этой карточки' });
      return;
    }

    await Card.findByIdAndRemove(cardId);

    res.send({ message: 'Карточка успешно удалена' });
    return;
  } catch (err) {
    validationErrors(res);
  }
};

const addLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
    }

    res.send(card);
  } catch (err) {
    validationErrors(res);
  }
};

const removeLike = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
    }

    res.send(card);
  } catch (err) {
    validationErrors(res);
  }
};

module.exports = {
  getCards, createCard, deleteCard, addLike, removeLike,
};
