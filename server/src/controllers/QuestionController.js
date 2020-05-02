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

            Question.findOneAndUpdate({ 
                product: product 
            }, { 
                $set: { 
                    product: product, 
                    questions: questions
                }
            }, { 
                upsert: true, 
                new: true 
            }, (err, data) => {
                if (err) {
                    return response.status(400).send({ error: "Error on creating question: " + err });
                }

                return response.json(data);
            });

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
                if(item.keywords.some(keyword => extractionResult.indexOf(removeAccents(keyword)) >= 0)){
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

        return response.send({ answer: matches[0] });
    },
    async index(request, response){
        const { page = 1, limit = 10 } = request.query;

        let query = {};

        if(request.query.product){
            query.product = request.query.product;
        }

        try{
            const questions = await Question.paginate(query, { 
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