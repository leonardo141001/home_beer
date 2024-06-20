// Função para incrementar o contador
function incrementCounter(id) {
    var counter = document.getElementById('counter_' + id);
    counter.innerHTML = parseInt(counter.innerHTML) + 1;
  }
  
  // Função para imprimir o pedido
  function imprimirPedido() {
    var pedidos = document.querySelectorAll('.menu-item');
    var pedidoTexto = '';
  
    
    // Loop através de todos os itens do menu
    pedidos.forEach(function(pedido, index) {
        var quantidade = parseInt(pedido.querySelector('#counter_' + (index + 1)).textContent);
        
        if (quantidade > 0) {
            var nome = pedido.querySelector('.menu-content a').textContent;
            var valor = pedido.querySelector('.menu-content span').textContent;
            pedidoTexto += `${nome}:  ${valor} Qntd: ${quantidade}\n`;
        }

    });
  
    var nomeCliente = prompt("Digite o nome do cliente ou mesa:");
  
    // Se o nome não for vazio, imprime o pedido
    if (nomeCliente !== null && nomeCliente !== "") {
      var textoFinal = `
        <div style="font-family: Arial, sans-serif; margin-bottom: 20px;">
          <h2 style="text-align: center;">Pedido do Cliente/Mesa: ${nomeCliente}</h2>
          <hr style="border-top: 2px solid #333; margin-bottom: 20px;">
          <div style="margin-left: 20px;">
            <pre style="font-size: 16px;">${pedidoTexto}</pre>
          </div>
        </div>
      `;
      
      // Abre uma nova janela para imprimir o texto formatado
      var novaJanela = window.open('', '_blank');
      novaJanela.document.open();
      novaJanela.document.write(textoFinal);
      novaJanela.document.close();
      // Imprime a nova janela
      novaJanela.print();
    }
  }
  /* 
// Função para adicionar um item à lista lateral
function adicionarItemLateral(item, quantidade) {
    // Verifica se a quantidade é maior que zero antes de adicionar o item à lista lateral
    if (quantidade > 0) {
      var listaLateral = document.getElementById("itens-adicionados");
      var novoItem = document.createElement("li");
      novoItem.textContent = item + " - Quantidade: " + quantidade;
      listaLateral.appendChild(novoItem);
      // Exibe a aba lateral
      document.getElementById("lateral").classList.add("mostrar");
    }
  }

// Adicionando um evento de clique para cada botão "Adicionar"
document.querySelectorAll("button[data-item]").forEach(function(button) {
  button.addEventListener("click", function() {
    var item = this.getAttribute("data-item");
    var itemId = parseInt(this.getAttribute("data-id"));
    var counter = document.getElementById('counter_' + itemId);
    var quantidade = parseInt(counter.textContent);
    // Incrementa o contador do item
    counter.textContent = quantidade + 1;
    // Adiciona o item à lista lateral
    adicionarItemLateral(item, quantidade + 1);
  });
});



 */