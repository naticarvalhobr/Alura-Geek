async function listaProdutos() {
    try {
        const conexao = await fetch("http://localhost:3000/produtos");
        
        console.log("Resposta da API para lista de produtos:", conexao);

        if (!conexao.ok) {
            throw new Error("Erro ao buscar produtos.");
        }

        const conexaoConvertida = await conexao.json();
        console.log("Produtos recebidos da API:", conexaoConvertida);

        return conexaoConvertida;
    } catch (erro) {
        console.error(erro);
        throw erro;  // Repassa o erro para quem chamou a função
    }
}

async function criaProduto(nome, valor, imagem) {
    try {
        const conexao = await fetch("http://localhost:3000/produtos", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ 
                nome: nome,
                valor: `R$ ${valor}`,
                imagem: imagem
            })
        });

        console.log("Resposta da API:", conexao);
        
        if (!conexao.ok) {
            throw new Error(`Erro ao cadastrar produto: ${conexao.status}`);
        }

        const conexaoConvertida = await conexao.json();
        alert("Produto cadastrado com sucesso!");
        return conexaoConvertida;
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao cadastrar o produto.");
    }
}

export async function excluirProdutoDaApi(id) {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error(`Erro ao excluir produto: ${response.status}`);
    }
}

export const conectaApi = { 
    listaProdutos,
    criaProduto,
    excluirProdutoDaApi
};
