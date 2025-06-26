const db = require('../configs/db');

async function listarClientes() {
  const [rows] = await db.query('SELECT * FROM clientes');
  return rows;
}

async function buscarCliente(id) {
  const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
}

async function criarCliente({ nome, sobrenome, email, idade }) {
  await db.query(
    'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
    [nome, sobrenome, email, idade]
  );
}

async function atualizarCliente(id, dados) {
  const { nome, sobrenome, email, idade } = dados;
  await db.query(
    'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
    [nome, sobrenome, email, idade, id]
  );
}

async function deletarCliente(id) {
  await db.query('DELETE FROM clientes WHERE id = ?', [id]);
}

module.exports = {
  listarClientes,
  buscarCliente,
  criarCliente,
  atualizarCliente,
  deletarCliente
};
