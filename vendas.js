document.addEventListener("DOMContentLoaded", function() {
    const salesTableBody = document.getElementById('sales-body');
    const addSaleForm = document.getElementById('add-sale-form');
    const totalCell = document.getElementById('total');
  
    let totalValue = 0;
  
    // Função para adicionar uma nova linha à tabela de vendas
    function addSaleRow(product, quantity, unitPrice) {
      const total = quantity * unitPrice;
      totalValue += total;
      const row = `
        <tr>
          <td>${product}</td>
          <td>${quantity}</td>
          <td>R$ ${unitPrice.toFixed(2)}</td>
          <td>R$ ${total.toFixed(2)}</td>
          <td><button class="remove-sale">Remover</button></td>
        </tr>`;
      salesTableBody.innerHTML += row;
      totalCell.textContent = totalValue.toFixed(2);
    }
  
    // Adicionar nova venda
    addSaleForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const product = document.getElementById('product').value.trim();
      const quantity = parseInt(document.getElementById('quantity').value);
      const unitPrice = parseFloat(document.getElementById('unit-price').value);
  
      if (product && quantity && unitPrice) {
        addSaleRow(product, quantity, unitPrice);
        addSaleForm.reset();
      }
    });
  
    // Remover venda
    salesTableBody.addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-sale')) {
        const row = event.target.closest('tr');
        const totalCell = row.querySelector('td:nth-child(4)');
        const total = parseFloat(totalCell.textContent.slice(2));
        totalValue -= total;
        totalCell.parentNode.removeChild(totalCell);
        row.parentNode.removeChild(row);
        document.getElementById('total').textContent = totalValue.toFixed(2);
      }
    });
  });
  