"use strict"

const NotAnsweredQuestion = require('../models/NotAnsweredQuestions.js');

module.exports = {
    async index(request, response){
        let query = {};

        if(request.query.product){
            query.product = request.query.product;
        }
        
        try{
            const notAnsweredQuestion = await NotAnsweredQuestion.find(query);
            
            return response.json(notAnsweredQuestion);
        }catch(err){
            return response.status(400).send(err.message)
        }
    },
    async destroy(request, response) {
        const { id } = request.params;
        
        try{
            await NotAnsweredQuestion.findByIdAndDelete(id);
    
            return response.sendStatus(200)
        }catch(err){
            return response.status(400).send(err.message)
        }
    },
}