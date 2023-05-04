function showValidationErrors(err, res) {
  const errors = { message: '' };

  Object.keys(err.errors).forEach((key) => {
    errors.message = errors.message.concat(`${err.errors[key].message} `);
  });

  res.status(400).send(errors);
}

module.exports = { showValidationErrors };
