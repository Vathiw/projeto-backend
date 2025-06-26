const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.listar);
router.post('/', usuariosController.criar);
router.delete('/:id', usuariosController.deletar);
router.post('/logout', usuariosController.logout);

module.exports = router;
