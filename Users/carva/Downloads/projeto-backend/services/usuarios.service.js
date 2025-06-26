const db = require('../configs/db');
const bcrypt = require('bcrypt');

async function listarUsuarios() {
  const [rows] = await db.query('SELECT id, usuario FROM usuarios');
  return rows;
}

async function criarUsuario({ usuario, senha }) {
  const hash = await bcrypt.hash(senha, 10);
  await db.query('INSERT INTO usuarios (usuario, senha) VALUES (?, ?)', [usuario, hash]);
}

module.exports = {
  listarUsuarios,
  criarUsuario
};
