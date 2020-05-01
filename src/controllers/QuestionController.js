"use strict"

const Question = require('../models/Question.js');
const keywordExtractor = require('keyword-extractor');

module.exports = {
    async create(request, response){
        const { product, questions } = request.body;

        try{            
            const isDuplicated = await Question.findOne({ product });    
            
            if(isDuplicated)
                return response.status(409).send({ error: "Duplicated entry" });

            const question = await Question.create({ product, questions });

            return response.json(question);
        }catch(err){
            return response.status(400).send(err.message);
        }
    },
    async ask(request, response){
        const { product, question } = request.body;

        const extractionResult = keywordExtractor.extract(question, {
            language:"portuguese",
            remove_digits: true,
            return_changed_case:true,
            remove_duplicates: false
       });

       const matches = [];

       const productQuestions = await Question.findOne({ product });

       productQuestions.questions.forEach((item) => {
            if(extractionResult.some(r => item.keywords.indexOf(r) >= 0)){
                matches.push(item.answers[item.standardAnswer]);
            }
       })

       return response.json(matches);
    },
    async index(request, response){
        const { page = 1, limit = 10 } = request.query;
        
        try{
            const questions = await Question.paginate({ 
             }, { 
                page, 
                limit
            });
        
            return response.json(questions);
        }catch(err){
            return response.status(400).send(err.message)
        }
    },
    async destroy(request, response) {
        const { id } = request.params;
        
        try{
            await Question.findByIdAndDelete(id);
    
            return response.sendStatus(200)
        }catch(err){
            return response.status(400).send(err.message)
        }
    },

    async update(request, response){
        try{
            const question = await Question.findByIdAndUpdate(request.params.id, request.body, { new: true });
            
            return response.json(question);
        }catch(err){
            return response.status(400).send(err.message)
        }
    }
};