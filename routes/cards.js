const express = require('express');
const { celebrate, errors } = require('celebrate');
const auth = require('../middlewares/auth');

const router = express.Router();
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');
const { cardValidationId, cardValidation } = require('../utils/jobSchema');

router.get('/cards', auth, getCards);
router.post('/cards', auth, celebrate(cardValidation), createCard);
router.delete('/cards/:cardId', auth, celebrate(cardValidationId), deleteCard);
router.put('/cards/:cardId/likes', auth, celebrate(cardValidationId), addLike);
router.delete(
  '/cards/:cardId/likes',
  auth,
  celebrate(cardValidationId),
  removeLike,
);

router.use(errors());

module.exports = router;
