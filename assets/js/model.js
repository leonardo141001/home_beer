let items = {};

function incrementCounter(itemId) {
    const counter = document.getElementById('counter_' + itemId);
    let count = parseInt(counter.textContent);
    count++;
    counter.textContent = count;

    const itemName = document.querySelector(`.menu-item:nth-child(${itemId}) .menu-content a`).textContent;

    if (items[itemId]) {
        items[itemId].quantity = count;
    } else {
        items[itemId] = { name: itemName, quantity: count };
    }

    updateItemsList();
}

function updateItemsList() {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';
    for (const [id, item] of Object.entries(items)) {
        if (item.quantity > 0) {
            const li = document.createElement('li');
            li.textContent = `${item.name}: ${item.quantity}`;
            itemsList.appendChild(li);
        }
    }
}

function sendOrder() {
    let pedidoTexto = '';
    for (const [id, item] of Object.entries(items)) {
        if (item.quantity >= 1) {
            pedidoTexto += `${item.name}: ${item.quantity}\n`;
        }
    }

    if (pedidoTexto.trim() === '') {
        alert("Nenhum item foi adicionado ao pedido.");
        return;
    }

    const nomeCliente = prompt("Digite o nome do cliente ou mesa:");

    if (nomeCliente !== null && nomeCliente !== "") {
        const dbRef = firebase.database().ref('pedidos');
        const novoPedidoRef = dbRef.push();

        novoPedidoRef.set({
            cliente: nomeCliente,
            pedido: pedidoTexto
        })
        .then(function() {
            alert("Pedido enviado com sucesso!");

            const textoFinal = `
                <div style="font-family: Arial, sans-serif; margin-bottom: 20px;">
                    <h2 style="text-align: center;">Pedido do Cliente/Mesa: ${nomeCliente}</h2>
                    <hr style="border-top: 2px solid #333; margin-bottom: 20px;">
                    <div style="margin-left: 20px;">
                        <pre style="font-size: 16px;">${pedidoTexto}</pre>
                    </div>
                </div>
            `;

            const novaJanela = window.open('', '_blank');
            novaJanela.document.open();
            novaJanela.document.write(textoFinal);
            novaJanela.document.close();
            novaJanela.print();
        })
        .catch(function(error) {
            console.error("Erro ao enviar pedido:", error);
            alert("Erro ao enviar pedido. Por favor, tente novamente.");
        });
    }
}




// Função para adicionar um item à lista lateral
function adicionarItemLateral(item) {
    var listaLateral = document.getElementById("itens-adicionados");
    var novoItem = document.createElement("li");
    novoItem.textContent = item;
    listaLateral.appendChild(novoItem);
  }

  // Adicionando um evento de clique para cada botão "Adicionar"
  document.querySelectorAll("button[data-item]").forEach(function(button) {
    button.addEventListener("click", function() {
      var item = this.getAttribute("data-item");
      adicionarItemLateral(item);
    });
  });

  document.getElementById("exibir-lista").addEventListener("click", function() {
    // Exibindo a aba lateral
    document.getElementById("lateral").classList.add("mostrar");

  });




