const service = require('../services/produtos.service');

module.exports = {
  async listar(req, res) {
    const dados = await service.listarProdutos();
    res.json(dados);
  },

  async buscar(req, res) {
    const produto = await service.buscarProduto(req.params.id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(produto);
  },

  async criar(req, res) {
    await service.criarProduto(req.body);
    res.status(201).json({ message: 'Produto criado com sucesso' });
  },

  async atualizar(req, res) {
    await service.atualizarProduto(req.params.id, req.body);
    res.json({ message: 'Produto atualizado' });
  },

  async deletar(req, res) {
    await service.deletarProduto(req.params.id);
    res.json({ message: 'Produto deletado' });
  }
};
