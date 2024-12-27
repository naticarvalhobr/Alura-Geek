// mostrarProdutos.js

import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

function constroiCard(nome, valor, imagem) {
    const produto = document.createElement("li");
    produto.classList.add("produtos__item", "card");  // Adicionando a classe CSS

    produto.innerHTML = `
        <img src="${imagem}" alt="Imagem do produto">
        <h3>${nome}</h3>
        <div class="card-container--value">
            <p>${valor}</p>
            <img src="./images/lixeiraIcon.png" alt="Excluir produto" />
        </div>
    `;
    console.log("Card de produto criado:", produto);  // Log para verificação do card criado

    return produto;
}

async function listaProdutos() {
    try {
        const listaApi = await conectaApi.listaProdutos();
        console.log("Lista de produtos recebida da API:", listaApi);  // Verificando os dados
        lista.innerHTML = '';  // Limpa a lista antes de adicionar os produtos
        listaApi.forEach(produto => {
            const produtoCard = constroiCard(produto.nome, produto.valor, produto.imagem);
            lista.appendChild(produtoCard);  // Adiciona o card de produto na lista
        });
    } catch (erro) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de produtos.</h2>`;
        console.error("Erro ao listar produtos:", erro);
    }
}

listaProdutos();
