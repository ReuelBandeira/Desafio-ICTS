const dbConn = require('../../config/db.config');

module.exports = cadastrarProduto = function (novoProduto, result) {    
    dbConn.query("INSERT INTO produto SET ?", novoProduto, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });           
};

module.exports = mostrarProdutos = function (result) {
    dbConn.query("select * from produto", function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });   
};

module.exports = atualizarProduto = function(id, dadosProduto, result){
  dbConn.query("UPDATE produto SET nome=?,descricao=?,preco=?,data_atualizacao=? WHERE id = ?", 
    [   dadosProduto.nome,
        dadosProduto.descricao,
        dadosProduto.preco,
        dataAtual = new Date(),
        id
    ], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};

module.exports = excluirProduto = function(id, result){
     dbConn.query("DELETE FROM produto WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};
