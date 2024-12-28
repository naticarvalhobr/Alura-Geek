// mostrarProdutos.js

import { conectaApi } from "./conectaApi.js";
import { excluirProduto } from "./excluirProduto.js";

// Função para criar o card
function constroiCard(nome, valor, imagem, id) {
    const produto = document.createElement("li");
    produto.classList.add("produtos__item", "card");

    // Card HTML
    produto.innerHTML = `
        <div class="descricao-produto">
            <img src="${imagem}" alt="Imagem do produto">
            <h3>${nome}</h3>
            <div class="card-container--value">
                <p>$ ${valor}</p>
                <button class="botao-excluir" aria-label="Excluir produto">
                    <img src="./images/lixeiraIcon.png" alt="Ícone de exclusão">
                </button>
            </div>
        </div>
    `;

    // Seleciona o botão de exclusão no card
    const botaoExcluir = produto.querySelector(".botao-excluir");

    // Adiciona o evento de clique ao botão de exclusão
    botaoExcluir.addEventListener("click", async () => {
        const confirmacao = confirm("Tem certeza de que deseja excluir este produto?");
        if (confirmacao) {
            const sucesso = await excluirProduto(id);
            if (sucesso) {
                produto.remove(); // Remove o card do DOM
            } else {
                alert("Não foi possível excluir o produto. Tente novamente.");
            }
        }
    });

    return produto;
}

async function listaProdutos() {
    try {
        const listaApi = await conectaApi.listaProdutos();
        const lista = document.querySelector("[data-lista]");
        lista.innerHTML = ''; // Limpa a lista antes de adicionar os produtos

        listaApi.forEach(produto => {
            const produtoCard = constroiCard(produto.nome, produto.valor, produto.imagem, produto.id);
            lista.appendChild(produtoCard); // Adiciona o card à lista
        });
    } catch (erro) {
        console.error("Erro ao listar produtos:", erro);
        const lista = document.querySelector("[data-lista]");
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de produtos.</h2>`;
    }
}

document.addEventListener("DOMContentLoaded", listaProdutos);
