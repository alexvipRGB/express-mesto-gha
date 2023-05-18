function validationErrors(res) {
  res.status(500).send({ message: 'Произошла ошибка на сервере' });
}

module.exports = { validationErrors };
