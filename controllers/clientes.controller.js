const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 30 });
const service = require('../services/clientes.service');

module.exports = {
  async listar(req, res) {
    const cached = cache.get('clientes');
    if (cached) {
      console.log('📦 Cache usado');
      return res.json(cached);
    }
    const dados = await service.listarClientes();
    cache.set('clientes', dados);
    console.log('🛢️ Banco usado');
    res.json(dados);
  },

  async buscar(req, res) {
    const cliente = await service.buscarCliente(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(cliente);
  },

  async criar(req, res) {
    await service.criarCliente(req.body);
    cache.del('clientes');
    res.status(201).json({ message: 'Cliente criado com sucesso' });
  },

  async atualizar(req, res) {
    await service.atualizarCliente(req.params.id, req.body);
    cache.del('clientes');
    res.json({ message: 'Cliente atualizado' });
  },

  async deletar(req, res) {
    await service.deletarCliente(req.params.id);
    cache.del('clientes');
    res.json({ message: 'Cliente deletado' });
  }
};
