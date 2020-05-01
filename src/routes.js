const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const QuestionController = require('./controllers/QuestionController')

routes = express.Router();

routes.post('/questions/create',QuestionController.create);
routes.post('/questions/ask', celebrate({[Segments.BODY]: Joi.object({
    product: Joi.string()
        .required(),
    question: Joi.string()
        .required()
    }),}), 
    QuestionController.ask
);
routes.get('/questions/', QuestionController.index)
routes.put('/questions/:id', QuestionController.update)
routes.delete('/questions/:id', QuestionController.destroy)

module.exports = routes;
