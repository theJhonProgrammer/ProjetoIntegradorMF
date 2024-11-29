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
        if (data.token) {
            console.log('Login bem-sucedido:', data);

            // Armazena o token no localStorage ou cookie
            localStorage.setItem('authToken', data.token);

            // Redireciona para a página retornada pelo servidor
            window.location.href = data.redirect_url;
        } else {
            alert('Login falhou.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Erro ao enviar dados.");
    });
}