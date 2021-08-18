var dados = {};

$(document).ready(function () {
  listarCompras();

  $("#btn-salvar").click(function () {
    total = $("#total").val();
    tipo_pagamento = $("#tipo_pagamento").val();
    status = $("#status").val();
    id = $("#id").val();

    console.log(status);

    type = id != "" ? "PUT" : "POST";

    data = {
      id: id == "" ? null : id,
      total: total,
      tipo_pagamento: tipo_pagamento,
      status: status,
    };

    $.ajax({
      url: "http://192.168.247.217:5000/compra",
      type: type,
      dataType: "JSON",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        $("#form-modal").modal("hide");
        window.alert(result.message);
        limpaCampos();
        listarCompras();
      },
    });
  });
});

function listarCompras() {
  $("#tabela-compra tbody").remove();

  $.ajax({
    url: "http://192.168.247.217:5000/compra",
    type: "GET",
    dataType: "JSON",
    contentType: "application/json",
    success: function (result) {
      if ($("#tabela-compra tbody").length == 0) {
        $("#tabela-compra").append("<tbody></tbody>");
      }
      dados = result;
      $.each(result, function (index, compra) {
        $("#tabela-compra tbody").append(compraLinhaTabela(index, compra));
      });
      // window.alert('Compra cadastrado com sucesso');
    },
  });
}

function limpaCampos() {
  $("#total").val("");
  $("#tipo_pagamento").val("");
  $("#status").val("");
  $("#id").val("");
}

function compraLinhaTabela(index, compra) {
  var ret =
    "<tr>" +
    "<td>" +
    index +
    "</td>" +
    "<td>" +
    compra.total +
    "</td>" +
    "<td>" +
    compra.data_criacao +
    "</td>" +
    "<td>" +
    compra.tipo_pagamento +
    "</td>" +
    "<td>" +
    compra.status +
    "</td>" +
    "<td>" +
    '<button type="button" class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#form-modal" onclick="editarCompra(' +
    index +
    ')">Editar</button>' +
    '&nbsp&nbsp<button type="button" class="btn btn-outline-danger btn-sm" onclick="excluirCompra(' +
    compra.id +
    ')">Excluir</button>' +
    "</td>" +
    "</tr>";
  return ret;
}

function excluirCompra(id) {
  if (window.confirm("Deseja exluir este compra?")) {
    $.ajax({
      url: "http://192.168.247.217:5000/compra/" + id,
      type: "DELETE",
      dataType: "JSON",
      contentType: "application/json",
      success: function (result) {
        listarCompras();
      },
    });
  }
}

function editarCompra(index) {
  $("#total").val(dados[index].total);
  $("#tipo_pagamento").val(dados[index].tipo_pagamento);
  $("#status").val(dados[index].status);
  $("#id").val(dados[index].id);
}
