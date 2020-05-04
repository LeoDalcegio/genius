"use strict"

function removeAccents(text) {
    const teste = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    return teste
}

module.exports = removeAccents;
