const service = require('../services/usuarios.service');
const { tokenBlacklist } = require('../services/cache');

module.exports = {
  async listar(req, res) {
    const dados = await service.listarUsuarios();
    res.json(dados);
  },

  async logout(req, res) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(400).json({ error: 'Token não fornecido' });

    const token = authHeader.split(' ')[1];
    tokenBlacklist.set(token, true);
    res.json({ message: 'Logout realizado com sucesso' });
  },

  async criar(req, res) {
    await service.criarUsuario(req.body);
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  },

  async deletar(req, res) {
    const id = req.params.id;
    try {
      await service.deletarUsuario(id);
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
};
