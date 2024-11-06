function filtrarCostureiras() {
    const servicoSelecionado = document.getElementById('servico').value;
    const localizacaoSelecionada = document.getElementById('localizacao').value;
    const costureiras = document.querySelectorAll('.costureira-card');

    costureiras.forEach(costureira => {
        const servico = costureira.getAttribute('data-servico');
        const localizacao = costureira.getAttribute('data-localizacao');

        // Verifica se o serviço e a localização correspondem à seleção do usuário
        if ((servicoSelecionado === 'todos' || servico === servicoSelecionado) &&
            (localizacaoSelecionada === 'todos' || localizacao === localizacaoSelecionada)) {
            costureira.style.display = 'block';
        } else {
            costureira.style.display = 'none';
        }
    });
}