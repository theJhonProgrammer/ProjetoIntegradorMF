function logar(event) {
    event.preventDefault(); // Evita o reload da página
    const usuario = document.getElementById("usuario").value;
    const senha= document.getElementById("senha").value;

    const dados = {
        username: usuario,
        password: senha
    };

    /* Faz a chamada da api para insercao */
    fetch('http://localhost:8000/api/login/', {
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