"use strict"

function removeAccents(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

module.exports = removeAccents;
