"use strict"

const extractKeywords = require('../utils/extractKeywords');
const removeAccents = require('../utils/removeAccents');

module.exports = {
    async getKeywords(request, response){
        const { text } = request.params;
        
        const keywords = extractKeywords(text);
        
        return response.send({ keywords: keywords })
    }
}
