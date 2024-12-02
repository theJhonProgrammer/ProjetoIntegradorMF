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
    
    fetch(`http://localhost:8000/api/pedidos/${id}/`, {
        method: 'DELETE'
        
    })
    .then(response => response)
    .then(data => {
      // Remove a linha da tabela (opcional)
      linha.remove();
      // location.reload();
      console.log('Linha excluída com sucesso:', data);
    })
    .catch(error => {
      console.log(data)
      console.error('Erro:', error);
    });
    
}


function editar(event) {
  const botao = document.getElementById('botaosalvar');
  botao.classList.remove('disabled');

  const linha = event.target.closest('tr');
  const celulasEditaveis = linha.querySelectorAll('.editable');
  

  celulasEditaveis.forEach(celula => {
      celula.contentEditable = true;
  });

}

function salvar(event) {
  
  const linha = event.target.parentNode.parentNode;

   // Obtém o ID da linha (adapte o seletor conforme sua estrutura HTML)
  const id = linha.querySelector('td:first-child').textContent;
  const novadata= linha.querySelector('td:nth-child(2)').textContent;
  const novahora = linha.querySelector('td:nth-child(3)').textContent;
  const novocliente = linha.querySelector('td:nth-child(4)').textContent;
  const novoservico = linha.querySelector('td:nth-child(5)').textContent;
  const novostatus= linha.querySelector('td:nth-child(6)').textContent;
  
  const partes = novadata.split('/');
  const dia = partes[0];
  const mes = partes[1];
  const ano = partes[2];

  // Reconstrói a data no formato yyyy-MM-dd
  const dataFormatada = `${ano}-${mes}-${dia}`;

  const parteshora = novahora.split(' ');
  const horaMinutos = parteshora[0].split(':');
  const ampm = partes[1].toUpperCase();

  let hora = parseInt(horaMinutos[0]);
  const minutos = horaMinutos[1];
  
  // Ajustar a hora para o formato de 24 horas
  if (ampm === 'PM' && hora !== 12) {
    hora += 12;
  } else if (ampm === 'AM' && hora === 12) {
    hora = 0;
  }

  // Formatar a hora no formato "HH:mm:ss"
  const hora24 = hora.toString().padStart(2, '0') + ':' + minutos + ':00';

  const dados = {
    data: dataFormatada,
    hora : hora24 ,
    cliente: novocliente ,
    servico: novoservico,
    status: novostatus
  };

  fetch(`http://localhost:8000/api/pedidos/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
  })
  .then(response => response)
  .then(data => {
    console.log('Agendamento atualizado com sucesso:', data);
    // Opcional: Remover o atributo contenteditable para evitar edições acidentais
    linha.querySelectorAll('td:not(:last-child)').forEach(td => {
      td.contentEditable = false;
    });
    location.reload()
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}