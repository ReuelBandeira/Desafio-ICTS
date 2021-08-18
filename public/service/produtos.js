
var dados = {};

$(document).ready(function(){
    listarProdutos();   

    $("#btn-salvar").click(function(){
        nome = $("#nome").val();
        descricao = $("#descricao").val();
        preco = $("#preco").val();
        id = $("#id").val();

        type = id != '' ? 'PUT' : 'POST'

        data = {
            id: id == ''? null: id,
            nome: nome, 
            descricao: descricao, 
            preco: preco
        }

        $.ajax({
            url: 'http://192.168.247.217:5000/produto' ,
            type: type,
            dataType: 'JSON',
            contentType: 'application/json',
            data:JSON.stringify(data),
            success: function(result){
                $('#form-modal').modal('hide');
                window.alert(result.message);
                limpaCampos();
                listarProdutos();
               
            }
        });

        

    });

});

function listarProdutos(){

    $("#tabela-produto tbody").remove();

    $.ajax({
        url: 'http://192.168.247.217:5000/produto' ,
        type: 'GET',
        dataType: 'JSON',
        contentType: 'application/json',
        success: function(result){
            if ($("#tabela-produto tbody").length == 0) {
                $("#tabela-produto").append("<tbody></tbody>");
            }
            dados = result;
            $.each(result, function (index, produto) {
                $("#tabela-produto tbody").append(
                    produtoLinhaTabela(index, produto)
                )
            });
            // window.alert('Produto cadastrado com sucesso');
        }
    });
}

function limpaCampos(){
    $("#nome").val('');
    $("#descricao").val('');
    $("#preco").val('');
    $("#id").val('');
}

function produtoLinhaTabela(index, produto) {
    
    var ret =
    '<tr>' +
        '<td>' + index + '</td>'+
        '<td>' + produto.nome + '</td>' +
        '<td>' + produto.descricao + '</td>'+
        '<td>' + produto.preco + '</td>' +
        '<td>'+
            '<button type="button" class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#form-modal" onclick="editarProduto('+index+')">Editar</button>'+
            '&nbsp&nbsp<button type="button" class="btn btn-outline-danger btn-sm" onclick="excluirProduto('+produto.id+')">Excluir</button>'+
            '</td>'+
    '</tr>';
    return ret;
}   

function excluirProduto(id){

    if(window.confirm('Deseja exluir este produto?')){

        $.ajax({
            url: 'http://192.168.247.217:5000/produto/'+id ,
            type: 'DELETE',
            dataType: 'JSON',
            contentType: 'application/json',
            success: function(result){
                listarProdutos();
            }
        });
    }
}

function editarProduto(index){
    $("#nome").val(dados[index].nome);
    $("#descricao").val(dados[index].descricao);
    $("#preco").val(dados[index].preco);
    $("#id").val(dados[index].id);
}

