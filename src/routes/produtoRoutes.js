const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.mostrarProdutos);
router.post('/', produtoController.cadastrarProduto);
router.put('/', produtoController.atualizarProduto);
router.delete('/(:id)', produtoController.excluirProduto);

module.exports = router