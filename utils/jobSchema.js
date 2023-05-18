const { Segments, Joi } = require('celebrate');
const validUrl = require('valid-url');

const cardValidation = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Поле "name" должно быть строкой',
        'string.empty': 'Поле "name" должно быть заполнено',
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    link: Joi.string()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      })
      .messages({
        'string.base': 'Поле "link" должно быть строкой',
        'string.empty': 'Поле "link" должно быть заполнено',
        'any.required': 'Поле "link" должно быть заполнено',
        'string.uri': 'Поле "link" должно быть допустимым URL-адресом',
      })
      .required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().messages({
      'string.base': 'Поле "cardId" должно быть строкой',
      'string.empty': 'Поле "cardId" должно быть заполнено',
      'string.length': 'Поле "cardId" должно быть длиной 24 символа',
      'string.hex':
        'Поле "cardId" должно содержать только шестнадцатеричные символы',
    }),
  }),
};

const cardValidationId = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().messages({
      'string.base': 'Поле "cardId" должно быть строкой',
      'string.empty': 'Поле "cardId" должно быть заполнено',
      'string.length': 'Поле "cardId" должно быть длиной 24 символа',
      'string.hex':
        'Поле "cardId" должно содержать только шестнадцатеричные символы',
    }),
  }),
};

const userValidation = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().length(24).hex().messages({
      'string.base': 'Поле "userId" должно быть строкой',
      'string.empty': 'Поле "userId" должно быть заполнено',
      'string.length': 'Поле "userId" должно быть длиной 24 символа',
      'string.hex':
        'Поле "userId" должно содержать только шестнадцатеричные символы',
    }),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).messages({
      'string.base': 'Поле "name" должно быть строкой',
      'string.empty': 'Поле "name" должно быть заполнено',
      'string.min': 'Минимальная длина поля "name" - 2',
      'string.max': 'Максимальная длина поля "name" - 30',
      'any.required': 'Поле "name" должно быть заполнено',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.base': 'Поле "about" должно быть строкой',
      'string.empty': 'Поле "about" должно быть заполнено',
      'string.min': 'Минимальная длина поля "about" - 2',
      'string.max': 'Максимальная длина поля "about" - 30',
      'any.required': 'Поле "about" должно быть заполнено',
    }),
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      })
      .messages({
        'string.base': 'Поле "avatar" должно быть строкой',
        'string.empty': 'Поле "avatar" должно быть заполнено',
        'any.required': 'Поле "avatar" должно быть заполнено',
        'string.uri': 'Поле "avatar" должно быть допустимым URL-адресом',
      }),
    email: Joi.string().email().required().messages({
      'string.base': 'Поле "email" должно быть строкой',
      'string.empty': 'Поле "email" должно быть заполнено',
      'string.email': 'Некорректный Email',
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().min(8).required().messages({
      'string.base': 'Поле "password" должно быть строкой',
      'string.empty': 'Поле "password" должно быть заполнено',
      'string.min': 'Минимальная длина поля "password" - 8',
      'any.required': 'Поле "password" должно быть заполнено',
    }),
  }),
};

const userUpdateValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).messages({
      'string.base': 'Поле "name" должно быть строкой',
      'string.empty': 'Поле "name" должно быть заполнено',
      'string.min': 'Минимальная длина поля "name" - 2',
      'string.max': 'Максимальная длина поля "name" - 30',
      'any.required': 'Поле "name" должно быть заполнено',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.base': 'Поле "about" должно быть строкой',
      'string.empty': 'Поле "about" должно быть заполнено',
      'string.min': 'Минимальная длина поля "about" - 2',
      'string.max': 'Максимальная длина поля "about" - 30',
      'any.required': 'Поле "about" должно быть заполнено',
    }),
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      })
      .messages({
        'string.base': 'Поле "avatar" должно быть строкой',
        'string.empty': 'Поле "avatar" должно быть заполнено',
        'any.required': 'Поле "avatar" должно быть заполнено',
        'string.uri': 'Поле "avatar" должно быть допустимым URL-адресом',
      }),
  }),
};

module.exports = {
  cardValidation,
  userValidation,
  cardValidationId,
  userUpdateValidation,
};
