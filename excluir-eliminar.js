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
  const hash = gerar(texto.value);
  if(hash !== "d66be74607aa68458d2687eaa3388e71")
  {
    alertaSenhaIncorreta();
    return;
  }
  let pedidos = carregarPedidos();
  if(eliminarPedidosID[1] === 0) pedidos = pedidos.filter(pedido=>pedido.id !== eliminarPedidosID[0]);
  else pedidos= pedidos.map(pedido=>{if(pedido.id===eliminarPedidosID[0]) {pedido.excluir="n";} return pedido;});
  salvarPedidos(pedidos);
  exibirPedidos();
  // Fecha o modal de confirmação
  let eliminarModalbb = bootstrap.Modal.getInstance(document.getElementById('eliminarModal'));
  eliminarModalbb.hide();
  eliminarPedidosID=null;
  alertSuccess();
 });

 function eliminarPedidosModal(id, tipo, msg)
 {
  eliminarPedidosID = [id ,tipo];
  let eliminarModalrr = new bootstrap.Modal(document.getElementById('eliminarModal'), {});
  let eliminarPedidosMSG = document.getElementById('spanConfirmModal');
  let eliminarModalBtn = document.getElementById('eliminarModalBtn');
  eliminarModalBtn.textContent= tipo===0?'Excluir':'Ativar';
  eliminarModalBtn.className = tipo===1?'btn btn-success':'btn btn-danger';
  eliminarPedidosMSG.textContent=msg;
  eliminarPedidosMSG.style.textAlign = 'center';
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