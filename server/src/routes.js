'use strict';

const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const QuestionController = require('./controllers/QuestionController')
const NotAnsweredQuestionController = require('./controllers/NotAnsweredQuestionController')

const routes = express.Router();

routes.post('/questions/create',QuestionController.create);
routes.post('/questions/ask', celebrate({[Segments.BODY]: Joi.object({
    product: Joi.string()
        .required(),
    question: Joi.string()
        .required()
    }),}), 
    QuestionController.ask
);

routes.get('/questions', celebrate({[Segments.QUERY]: Joi.object({
    product: Joi.string()
    }),}), 
    QuestionController.index
);

routes.get('/questions/:id', QuestionController.show);

routes.put('/questions/:id', QuestionController.update);
routes.delete('/questions/:id', QuestionController.destroy);

routes.get('/notAnsweredQuestions/',celebrate({[Segments.QUERY]: Joi.object({
    product: Joi.string()
    }),}),  
    NotAnsweredQuestionController.index
);

routes.delete('/notAnsweredQuestions/:id', NotAnsweredQuestionController.destroy);


module.exports = routes;
