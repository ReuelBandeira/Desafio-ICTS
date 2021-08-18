const dbConn = require("../../config/db.config");

module.exports = cadastrarCompra = function (novaCompra, result) {
  dbConn.query("INSERT INTO compra SET ?", novaCompra, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

module.exports = mostrarCompras = function (result) {
  dbConn.query("select * from compra", function (err, res) {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = atualizarCompra = function (id, dadosCompra, result) {
  dbConn.query(
    "UPDATE compra SET total=?,tipo_pagamento=?,status=? WHERE id = ?",
    [dadosCompra.total, dadosCompra.tipo_pagamento, dadosCompra.status, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = excluirCompra = function (id, result) {
  dbConn.query("DELETE FROM compra WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
