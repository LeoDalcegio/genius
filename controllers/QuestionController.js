module.exports = {
    async ask(request, response){
        const { question, productInfo } = request.body;

        let matches = { };

        productInfo.forEach(() => {
            // Compara as palavras da question com os "itens" do product info
            // Se deu match, coloca item e valor no objeto de matches
            
            // Se algum item for um array, ou tiver mais de um valor, ex: item1: { valor1, valor2 },
            // coloca o "item": se tem nome, -> "nome: valor" , "nome: valor"
                              //se não tem nome, valor, valor, valor
        }); 

        // monta uma resposta bonita, devolve ela
    }
}
