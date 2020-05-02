"use strict"

const Question = require('../models/Question.js');
const NotAnsweredQuestion = require('../models/NotAnsweredQuestions.js');
const keywordExtractor = require('keyword-extractor');

module.exports = {
    async create(request, response){
        const { product, questions } = request.body;

        try{            
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

        const extractionResult = keywordExtractor.extract(question, {
            language:"portuguese",
            remove_digits: true,
            return_changed_case:true,
            remove_duplicates: false
        });

        const matches = [];

        const productQuestions = await Question.findOne({ product });

        if(productQuestions){
            productQuestions.questions.forEach((item) => {
                if(extractionResult.some(r => item.keywords.indexOf(r) >= 0)){
                    matches.push(item.answers[item.standardAnswer]);
                }
            });
        }

        if(!matches.length){
            await NotAnsweredQuestion.create({
                product,
                question: question,
                questionKeyWords: extractionResult
            });

            return response.status(200).send({ message: "This product does not have any questions/anwsers to it, but we added this question to the NotAnsweredQuestion document." });
        };

        return response.json(matches);
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