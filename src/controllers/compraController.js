const Compra = require('../models/compraModel');

exports.mostrarCompras = function(req, res) {
  mostrarCompras(function(err, compra) {
    res.send(compra);
  });
};

exports.cadastrarCompra = function(req, res) {
    const novaCompra = req.body;

    if(Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Erro ao processar as informações' });
    }else{
      cadastrarCompra(novaCompra, function(err, compra) {
            if (err)
              res.send(err);
            res.json({error:false,message:"Compra cadastrada com sucesso!",data:compra});
        });
    }
};

exports.atualizarCompra = function(req, res) {
    if(Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Erro ao processar as informações' });
    }else{
        atualizarCompra(req.body.id, req.body, function(err, compra) {
            if (err)
              res.send(err);
            res.json({ error:false, message: 'compra atualizada com sucesso' });
        });
    }
  
};

exports.excluirCompra = function(req, res) {
  excluirCompra( req.params.id, function(err, compra) {
    if (err)
      res.send(err);
    res.json({ error:false, message: 'compra excluida com sucesso' });
  });
};