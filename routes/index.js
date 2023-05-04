// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use(userRouter);
router.use(cardRouter);
router.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
