//--- Função para exibir os pedidos na tabela
function exibirPedidos() {
  let pedidos = carregarPedidos();
  let tabelaBody = document.getElementById('pedidoTabela').getElementsByTagName('tbody')[0];
  let alertaSemPedidos = document.getElementById('alertaSemPedidos');
  let spanvew = document.getElementById('spanvew');
  spanvew.className = mostrandoExcluidos?"text-danger":"text-success";
  spanvew.textContent = mostrandoExcluidos?"EXCLUIDOS":"ATIVOS";
  // Limpa o conteúdo da tabela
  tabelaBody.innerHTML = ''; 
  let pedidosAtivos = mostrandoExcluidos?pedidos.filter(pedido => pedido.excluir === "s"):pedidos.filter(pedido => pedido.excluir === "n");
  // Mostra o alerta se não houver pedidos
  if (pedidosAtivos.length === 0 && !mostrandoExcluidos)
    alertaSemPedidos.style.display = 'block'; 

  else {
    // Esconde o alerta se houver pedidos
    alertaSemPedidos.style.display = 'none'; 
    pedidosAtivos.forEach((pedido, index) => 
    {
      let row = tabelaBody.insertRow();
      if(pedido.dataPedido.includes(' / ')) row.className = 'table-warning';
      if(mostrandoExcluidos) row.className = 'table-danger';
      let cellQuantidade = row.insertCell(0);
      //--- Quantidade
      cellQuantidade.textContent = pedido.quantidade;
      cellQuantidade.style.textAlign = 'center';
      //--- Descrição do material
      let cellDescricao = row.insertCell(1);
      cellDescricao.textContent = pedido.descricao;
      //--- Data do pedido (e da nota se houver)
      let cellDataPedido = row.insertCell(2);
      cellDataPedido.textContent = pedido.dataPedido;
      //--- Anotação
      let cellAnotacao = row.insertCell(3);
      if (pedido.anotacao)
      {
        let popoverButton = document.createElement('a');
        popoverButton.style.width = '100%';
        popoverButton.className = 'btn btn-lg btn-link';
        popoverButton.setAttribute('role' , 'button');
        popoverButton.setAttribute('tabindex', index);
        popoverButton.setAttribute('data-bs-toggle', 'popover');
        popoverButton.setAttribute('data-bs-trigger', 'focus');
        popoverButton.setAttribute('title', 'Anotação');
        popoverButton.setAttribute('data-bs-content', pedido.anotacao);
        popoverButton.textContent = '🛈';
        popoverButton.style.fontSize="30px";
        popoverButton.style.textDecoration="none";
        popoverButton.style.marginTop = "-10px";
        popoverButton.style.padding = "0";
        cellAnotacao.appendChild(popoverButton);
        new bootstrap.Popover(popoverButton);
      }
      //--- Campos dos botões
      let cellAcoes = row.insertCell(4);
      cellAcoes.style.textAlign = 'center';
      cellAcoes.style.width = '190px';
      if(!mostrandoExcluidos)
      { 
        //--- Botões de ação (Editar e Excluir)
        let editarButton = document.createElement('button');
        editarButton.className = 'btn btn-outline-primary btn-sm me-2 divAnotacao';
        editarButton.textContent = 'Editar';
        editarButton.onclick = function () {
          let modalTitle = document.getElementById('staticBackdrop').querySelector('.modal-title')
          let modalSalvar = document.getElementById('staticBackdrop').querySelector('.modalSalvar')
          let textarea = document.getElementById('divAnotacao');
          textarea.style.display = 'block';
          modalTitle.textContent = 'Editando Pedido de Material';
          modalSalvar.textContent = 'Salvar';
          editarPedido(pedido.id); 
        };
        editarButton.disabled=false;
        //--- Botão excluir
        let excluirButton = document.createElement('button');
        excluirButton.onclick = function () { excluirPedido(pedido.id); };
        excluirButton.className = 'btn btn-outline-danger btn-sm';
        excluirButton.textContent = 'Excluir';
        excluirButton.disabled=false;
        cellAcoes.appendChild(editarButton);
        cellAcoes.appendChild(excluirButton);
      }
      else
      {
        //--- Botão Eliminar
        let eliminarButton = document.createElement('button');
        eliminarButton.className = 'btn btn-outline-danger btn-sm';
        eliminarButton.textContent = 'X';
        eliminarButton.onclick = function () { eliminarPedidosModal(pedido.id, 0); };
        cellAcoes.appendChild(eliminarButton);
        
        let ativarButton = document.createElement('button');
        ativarButton.className = 'btn btn-success btn-sm ms-2';
        ativarButton.textContent = 'Reativar';
        ativarButton.onclick = function () { eliminarPedidosModal(pedido.id, 1); };
        cellAcoes.appendChild(ativarButton);
      }
      //--- Inicializa o popover (se houver)
      if (pedido.anotacao)
      {
        let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        let popoverList = popoverTriggerList.map(function (popoverTriggerEl)
        { return new bootstrap.Popover(popoverTriggerEl);});
      }
    });
  }
}