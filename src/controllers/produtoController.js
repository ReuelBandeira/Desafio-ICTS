const Produto = require('../models/produtoModel');

exports.mostrarProdutos = function(req, res) {
  mostrarProdutos(function(err, produto) {
    res.send(produto);
  });
};

exports.cadastrarProduto = function(req, res) {
    const novoProduto = req.body;

    if(Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Erro ao processar as informações' });
    }else{
      cadastrarProduto(novoProduto, function(err, produto) {
            if (err)
              res.send(err);
            res.json({error:false,message:"Produto cadastrado com sucesso!",data:produto});
        });
    }
};

exports.atualizarProduto = function(req, res) {
    if(Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Erro ao processar as informações' });
    }else{
        atualizarProduto(req.body.id, req.body, function(err, produto) {
            if (err)
              res.send(err);
            res.json({ error:false, message: 'Produto atualizado com sucesso' });
        });
    }
  
};

exports.excluirProduto = function(req, res) {
  excluirProduto( req.params.id, function(err, produto) {
    if (err)
      res.send(err);
    res.json({ error:false, message: 'Produto excluido com sucesso' });
  });
};