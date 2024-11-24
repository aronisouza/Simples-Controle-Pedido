document.getElementById('confirmarExclusaoBtn').addEventListener('click', function()
{
  let pedidos = carregarPedidos();
  pedidos= pedidos.map(pedido=>{
  if(pedido.id===indexParaExcluir) {pedido.excluir="s";} return pedido;});
  // Salva o array atualizado no localStorage
  salvarPedidos(pedidos);
  // Atualiza a tabela para refletir a exclusão
  exibirPedidos();
  // Fecha o modal de confirmação
  let confirmacaoModal = bootstrap.Modal.getInstance(document.getElementById('confirmacaoModal'));
  confirmacaoModal.hide();
});

//--- Elimina definitivamente o pedido passado pelo id
document.getElementById('eliminarModalBtn').addEventListener('click', function()
{
  let texto = document.getElementById('eliminar');
  const hash = gerarMD5(texto.value);
  if(hash !== "d66be74607aa68458d2687eaa3388e71")
  {
    alertaSenhaIncorreta();
    return;
  }
  let pedidos = carregarPedidos();
  pedidos = pedidos.filter(pedido=>pedido.id !== eliminarPedidosID);
  salvarPedidos(pedidos);
  eliminarPedidosID=null;
  exibirPedidos();
  // Fecha o modal de confirmação
  let eliminarModalbb = bootstrap.Modal.getInstance(document.getElementById('eliminarModal'));
  eliminarModalbb.hide();
  alertSuccess();
 });

 function eliminarPedidosModal(id)
 {
  eliminarPedidosID = id;
  let eliminarModalrr = new bootstrap.Modal(document.getElementById('eliminarModal'), {});
  eliminarModalrr.show();
  limparFormulario();
 }

 //--- Função para marcar pedido com exluido. Ele ainda aparece não função pedidos Excluido ao apertar HOME
//--- Para eliminar definitivamente usar o botão X na página ao apertar HOME
function excluirPedido(id)
{
  indexParaExcluir=id;
  let confirmacaoModal = new bootstrap.Modal(document.getElementById('confirmacaoModal'), {});
  // Exibe o modal de confirmação
  confirmacaoModal.show();
  limparFormulario();
}