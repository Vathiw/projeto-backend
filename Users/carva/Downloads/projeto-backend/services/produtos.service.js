const db = require('../configs/db');
const cache = require('./cache');

async function listarProdutos() {
  const cacheKey = 'produtos';
  const cachedProdutos = cache.get(cacheKey);
  if (cachedProdutos) {
    console.log('📦 Cache usado - produtos');
    return cachedProdutos;
  }

  console.log('🛢️ Banco usado - produtos');
  const [rows] = await db.query('SELECT * FROM produtos');
  cache.set(cacheKey, rows);
  return rows;
}

// Quando criar, atualizar ou deletar produtos, limpe o cache:
async function criarProduto({ nome, descricao, preco, data_atualizado }) {
  await db.query(
    'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)',
    [nome, descricao, preco, data_atualizado]
  );
  cache.del('produtos'); // Invalida cache
}

async function atualizarProduto(id, dados) {
  const { nome, descricao, preco, data_atualizado } = dados;
  await db.query(
    'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?',
    [nome, descricao, preco, data_atualizado, id]
  );
  cache.del('produtos'); // Invalida cache
}

async function deletarProduto(id) {
  await db.query('DELETE FROM produtos WHERE id = ?', [id]);
  cache.del('produtos'); // Invalida cache
}

async function buscarProduto(id) {
  const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
  return rows[0] || null;
}

module.exports = {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto
};
