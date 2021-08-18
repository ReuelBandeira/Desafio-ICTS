const express = require('express');
const router = express.Router();

const compraController = require('../controllers/compraController');

router.get('/', compraController.mostrarCompras);
router.post('/', compraController.cadastrarCompra);
router.put('/', compraController.atualizarCompra);
router.delete('/(:id)', compraController.excluirCompra);

module.exports = router;