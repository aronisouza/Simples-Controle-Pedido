
//--- Salvar pedidos no Local Storage
function salvarPedidos(pedidos)
{localStorage.setItem('pedidos', JSON.stringify(pedidos));}

// --- Função para carregar um pedido no modal para edição
function editarPedido(index)
{
  let pedidos = carregarPedidos();

  let modalSalvar = document.getElementById('staticBackdrop').querySelector('.modalSalvar');
  modalSalvar.textContent = 'Salvar';

  pedidos= pedidos.map(pedido=>
  {
    if(pedido.id===index)
    {
      // Preencher os campos do modal com os dados do pedido
      document.getElementById('material').value = pedido.material;
      document.getElementById('datapedido').value = pedido.dataPedido.split(' / ')[0];
      document.getElementById('qntpedido').value = pedido.quantidade;
      if (pedido.dataPedido.includes(' / '))
      {
        document.getElementById('checkboxNota').checked = true;
        // Carrega a data da nota
        document.getElementById('dataNota').value = pedido.dataPedido.split(' / ')[1]; 
        toggleDataNota();
      }
      else
      {
        document.getElementById('checkboxNota').checked = false;
        toggleDataNota();
      }
      document.getElementById('anotacao').value = pedido.anotacao || '';
      // Armazenar o índice do pedido que está sendo editado
      pedidoEditandoIndex = index;
      // Abrir o modal para edição
      let modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
      modal.show();
    }
  });
}

// --- Função para salvar um novo pedido
function salvarPedido() {
  let materialSelect = document.getElementById('material');
  let material = materialSelect.value;
  let descricao = materialSelect.options[materialSelect.selectedIndex].text;
  let dataPedido = document.getElementById('datapedido').value;
  let quantidade = document.getElementById('qntpedido').value;
  let anotacao = document.getElementById('anotacao').value;
  // Verificar se o checkbox está marcado e adicionar a data da nota, se informada
  let checkboxNota = document.getElementById('checkboxNota');
  let dataNota = document.getElementById('dataNota').value;
  // Validação: Material não pode ser 'Qual Material...'
  if (material === 'Qual Material...') {alertaPersonalizado('Por favor, selecione um material válido.','info');return;}
  // Validação: Data do pedido não pode ser vazia ou inválida
  if (!dataPedido){alertaPersonalizado('Por favor, insira uma data válida para o pedido.','info');return;}
  // Validação: Quantidade não pode ser menor que 1
  if (quantidade < 1 || isNaN(quantidade)) {alertaPersonalizado('Por favor, insira uma quantidade válida (maior que 0).','info');return;}
  // Se o checkbox da nota estiver marcado, adiciona a data da nota ao pedido
  if (checkboxNota.checked) {
    if (!dataNota) {alertaPersonalizado('Por favor, insira uma data válida para a chegada de nota.','info');return;}
    // Adiciona a data da nota ao lado da data do pedido
    dataPedido += ' / ' + dataNota; 
  }
  let pedidos = carregarPedidos();
  if (pedidoEditandoIndex != null)
  {
    pedidos= pedidos.map(pedido=>
    {
      if(pedido.id===pedidoEditandoIndex)
      {
        pedido.material = material;
        pedido.descricao = descricao;
        pedido.dataPedido = dataPedido;
        pedido.quantidade = quantidade;
        pedido.anotacao = anotacao;
      }
      return pedido;
    });
    pedidoEditandoIndex = null; // Resetar o índice de edição após salvar
    toastAlert('Pedido salvo e tabela atualizada.','success','top');
  }
  else
  {
    let id = Date.now();
    let novoPedido = {
      "id": id,
      "material": material,
      "descricao": descricao,
      "dataPedido": dataPedido,
      "quantidade": quantidade,
      "anotacao": anotacao,
      "excluir" : "n"
    };
    // Adicionar um novo pedido
    pedidos.push(novoPedido);
    toastAlert('Novo Pedido adicionada na tabela.','success','top');
  }
  salvarPedidos(pedidos);
  exibirPedidos();
  // Fecha o modal
  let modal = document.getElementById('staticBackdrop');
  let bootstrapModal = bootstrap.Modal.getInstance(modal);
  limparFormulario();
  bootstrapModal.hide();
}