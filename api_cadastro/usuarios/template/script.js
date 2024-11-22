function salvarDados(event) {
    event.preventDefault(); // Evita o reload da página
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;

    const dados = {
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco
    };

    /* Faz a chamada da api para insercao */
    fetch('http://localhost:8000/api/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert("Dados enviados com sucesso!");
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Erro ao enviar dados.");
    });
}