// const token = localStorage.getItem('token');
// console.log("cehou no script:", token)
// // Faz uma requisição autenticada
// fetch('/api/pedidos/', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Token ${token}`, // Adiciona o token no cabeçalho
//     }
// })
// .then(response => response.json())
// .then(data => {

//     console.log(data); // Processa os dados da resposta
// })
// .catch(error => {
//     console.log(error);
//     // Redireciona para a página de login, se necessário
    
// });

// Função para adicionar um novo agendamento à tabela
function salvarAgendamento(event) {
    
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const cliente = document.getElementById("cliente").value;
    const servico = document.getElementById("servico").value;
    const status= document.getElementById("status").value;

    const dados = {
        data: data,
        hora : hora ,
        cliente: cliente,
        servico: servico,
        status: status
    };
    
    /* Faz a chamada da api para insercao */
    fetch('http://localhost:8000/api/pedidos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        
        location.reload()
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Erro ao enviar dados.");
    });
}

function excluir(event){
    /* Faz a chamada da api para insercao */

    const linha = event.target.parentNode.parentNode;

  // Obtém o ID da linha (adapte o seletor conforme sua estrutura HTML)
    const id = linha.querySelector('td:first-child').textContent;
    
    fetch(`http://localhost:8000/api/pedidos/${id}`, {
        method: 'DELETE',
        
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao excluir linha');
        }
        return response.json();
      })
      .then(data => {
        // Remove a linha da tabela (opcional)
        linha.remove();
        console.log('Linha excluída com sucesso:', data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
    
}