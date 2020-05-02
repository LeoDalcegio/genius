"use strict"

function extractKeywords(text) {
    const keywordExtractor = require('keyword-extractor');

    const extractionResult = keywordExtractor.extract(text, {
        language:"portuguese",  
        remove_digits: true,
        return_changed_case:true, // all returned keywords will be on lowercase
        remove_duplicates: false
    });

    return extractionResult;
}

module.exports = extractKeywords;