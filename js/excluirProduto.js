import { excluirProdutoDaApi } from "./conectaApi.js";

export async function excluirProduto(id) {
    try {
        await excluirProdutoDaApi(id);
        console.log(`Produto com ID ${id} excluído com sucesso.`);
        return true;
    } catch (error) {
        console.error(`Erro ao excluir produto: ${error}`);
        return false;
    }
}
