"use strict"

const Question = require('../models/Question.js');
const NotAnsweredQuestion = require('../models/NotAnsweredQuestions.js');
const extractKeywords = require('../utils/extractKeywords');
const removeAccents = require('../utils/removeAccents');

module.exports = {
    async create(request, response){
        const { product, questions } = request.body;

        try{            
            // search for keywords if not given any of them
            questions.forEach((part, index, theArray) => {
                if(!theArray[index].keywords.length){
                    theArray[index].keywords = extractKeywords(theArray[index].question);
                }
            });

            const existentQuestion = await Question.findOne({ product });

            if(existentQuestion){
                return response.send({ error: "There are already questions for this product."})
            }

            const createdQuestions = await Question.create({ 
                product: product, 
                questions: questions
            });

            return response.json(createdQuestions);
        }catch(err){
            return response.status(400).send(err.message);
        }
    },
    async ask(request, response){
        const { product, question } = request.body;

        const extractionResult = extractKeywords(question);

        extractionResult.forEach((part, index, theArray) => {
            theArray[index] = removeAccents(theArray[index]);
        });

        const matches = [];

        const productQuestions = await Question.findOne({ product });

        if(productQuestions){
            productQuestions.questions.forEach((item) => {        
                if(item.keywords.some(keyword => extractionResult.indexOf(removeAccents(keyword).toLowerCase()) >= 0)){
                    matches.push(item.answers[item.standardAnswer]);
                }
            });
        };

        if(!matches.length){
            await NotAnsweredQuestion.create({
                product,
                question: question,
                questionKeyWords: extractionResult
            });

            return response.status(200).send({ message: "This product does not have any questions/anwsers to it, but we added this question to the NotAnsweredQuestion document." });
        };

        const answer = matches[0]; 

        return response.send({ answer });
    },
    async index(request, response){
        let query = {};

        if(request.query.product){
            query.product = request.query.product;
        }

        try{
            const questions = await Question.find(query);
        
            return response.json(questions);
        }catch(err){
            return response.status(400).send(err.message)
        }
    },
    async show(request, response) {
        const { id } = request.params;

        const question = await Question.findById(id);

        return response.json(question);
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
