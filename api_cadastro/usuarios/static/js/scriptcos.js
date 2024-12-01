const token = localStorage.getItem('token');
console.log("cehou no script:", token)
// Faz uma requisição autenticada
fetch('/api/pedidos/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`, // Adiciona o token no cabeçalho
    }
})
.then(response => response.json())
.then(data => {

    console.log(data); // Processa os dados da resposta
})
.catch(error => {
    console.log(error);
    // Redireciona para a página de login, se necessário
    
});