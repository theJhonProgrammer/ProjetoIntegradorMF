// Inicializando o mapa com Cascavel - PR como padrão
const map = L.map('map').setView([-24.9555, -53.4552], 12); // Coordenadas de Cascavel, PR

// Camada do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Preencher o campo de busca com "Cascavel, PR" por padrão
document.getElementById('location').value = 'Cascavel, PR';

// Função de busca por região usando a API Nominatim
function searchLocation() {
    const location = document.getElementById('location').value;
    if (!location) {
        alert('Por favor, insira uma região.');
        return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon, display_name } = data[0];
                map.setView([lat, lon], 12);

                L.marker([lat, lon]).addTo(map)
                    .bindPopup(`Local: ${display_name}`)
                    .openPopup();
            } else {
                alert('Localização não encontrada.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar localização:', error);
            alert('Erro ao buscar localização. Tente novamente.');
        });
}
