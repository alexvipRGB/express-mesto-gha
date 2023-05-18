const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const validationErrors = require('./utils/validError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(router);

app.use(validationErrors);

app.listen(PORT);
