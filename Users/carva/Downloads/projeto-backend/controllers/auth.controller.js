const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../configs/db');

module.exports = {
  login: async (req, res) => {
    const { usuario, senha } = req.body;

    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if (!usuarios.length) return res.status(400).json({ error: 'Usuário inválido' });

    const user = usuarios[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id, usuario: user.usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await db.query('UPDATE usuarios SET token = ? WHERE id = ?', [token, user.id]);

    res.json({ token });
  },

  logout: async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(400).json({ error: 'Token não enviado' });

    await db.query('UPDATE usuarios SET token = NULL WHERE token = ?', [token]);
    res.json({ message: 'Logout realizado com sucesso' });
  }
};
