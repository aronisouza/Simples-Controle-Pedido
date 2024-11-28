// Variáveis global
let pedidoEditandoIndex;
let eliminarPedidosID;
let indexParaExcluir;
let mostrandoExcluidos = false;

//--- Limpa o modal ao clicar em cancelar
document.addEventListener('DOMContentLoaded', function()
{
  exibirPedidos();
  // Adiciona o evento de limpar o formulário ao fechar o modal
  const modalElement = document.getElementById('staticBackdrop');
  modalElement.addEventListener('hidden.bs.modal', limparFormulario);
  // Adiciona o evento de clique no botão "Cancelar" para limpar o formulário
  const btnCancelar = modalElement.querySelector('.btn-secondary');
  btnCancelar.addEventListener('click', limparFormulario);
});

//--- Muda a vizualização da tabela entre Ativos e Excluidos
document.addEventListener('keydown', function(event)
{if(event.key=== "Home"){ mostrandoExcluidos = !mostrandoExcluidos; exibirPedidos();}});

//--- Carregar os pedidos do Local Storage
function carregarPedidos()
{return JSON.parse(localStorage.getItem('pedidos')) || [];}

//--- Função para exibir/ocultar o campo de data da nota
function toggleDataNota()
{
  let checkboxNota = document.getElementById('checkboxNota');
  let divDataNota = document.getElementById('divDataNota');
  if (checkboxNota.checked)
    divDataNota.style.display = 'block'; // Exibe o campo de data se o checkbox estiver marcado
  else {
    divDataNota.style.display = 'none'; // Oculta o campo de data se o checkbox estiver desmarcado
    document.getElementById('dataNota').value = ''; // Limpa o campo de data
  }
}

//--- Função para limpar os campos do formulário após salvar
function limparFormulario()
{
  document.getElementById('material').value = 'Qual Material...';
  document.getElementById('datapedido').value = '';
  document.getElementById('qntpedido').value = '';
  document.getElementById('checkboxNota').checked = false;
  document.getElementById('dataNota').value = '';
  document.getElementById('anotacao').value = '';
  toggleDataNota();
  pedidoEditandoIndex = null;
  checkboxDiv.style.display = 'none';
}

//--- Criptografia
function gerar(texto)
{return CryptoJS.MD5(texto).toString();}

//--- Mesma funcionalidade da techa HOME
function alternarTexto(link) {
  //--- Obtém o estado atual do link
  const estadoAtual = link.getAttribute("data-estado");
  //--- Alterna entre "ativos" e "excluidos"
  if (estadoAtual === "ativos") {
    link.setAttribute("data-estado", "excluidos");
    link.textContent = "EXCLUÍDOS";
  } else {
    link.setAttribute("data-estado", "ativos");
    link.textContent = "ATIVOS";
  }
  mostrandoExcluidos = !mostrandoExcluidos; exibirPedidos();
}

let checkboxDiv = document.getElementById('checkboxDiv')
checkboxDiv.style.display = 'none';

// Carrega e exibe os pedidos ao carregar a página
window.onload = exibirPedidos;
