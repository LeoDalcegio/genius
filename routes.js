const QuestionController = require('./controllers/QuestionController');
const express = require('express');

routes = express.Router();

routes.post('/question', QuestionController.ask);

module.exports = routes;
