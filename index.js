const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const synonyms = require('synonyms');
const app = express();

const PORT = process.env.PORT || 5000

app.use(cors());

app.use(express.json());
app.use('/api', require('./routes'));

morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  })

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
