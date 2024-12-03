// function filtrarCostureiras() {
//     const servicoSelecionado = document.getElementById('servico').value;
//     const localizacaoSelecionada = document.getElementById('localizacao').value;
//     const costureiras = document.querySelectorAll('.costureira-card');

//     costureiras.forEach(costureira => {
//         const servico = costureira.getAttribute('data-servico');
//         const localizacao = costureira.getAttribute('data-localizacao');

//         // Verifica se o serviço e a localização correspondem à seleção do usuário
//         if ((servicoSelecionado === 'todos' || servico === servicoSelecionado) &&
//             (localizacaoSelecionada === 'todos' || localizacao === localizacaoSelecionada)) {
//             costureira.style.display = 'block';
//         } else {
//             costureira.style.display = 'none';
//         }
//     });
// }

// // Inicializando o mapa com Cascavel - PR como padrão
// const map = L.map('map').setView([-24.9555, -53.4552], 12); // Coordenadas de Cascavel, PR

// // Camada do OpenStreetMap
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// Preencher o campo de busca com "Cascavel, PR" por padrão
document.getElementById('location').value = 'Cascavel, PR';


// // L.marker([-24.920475232322964, -53.420102578170535]).addTo(map)
// //     .bindPopup("Ana Bordadeira")
// //     .openPopup();
                
// // L.marker([-24.91071811097087, -53.41200969681368]).addTo(map)
// //     .bindPopup("Clara Costureira")
// //     .openPopup();
    
// // m=-24.93491098947162, -53.403921062591365
// // L.marker([-24.93491098947162, -53.403921062591365]).addTo(map)
// //     .bindPopup("Maria das Costuras")
// //     .openPopup();

// // Função de busca por região usando a API Nominatim

function drawPolylineAndShowDistance(clienteCoords, costureiraCoords, costureiraNome) {
    const polyline = L.polyline([clienteCoords, costureiraCoords], {color: 'blue'}).addTo(map);
    const distance = calculateDistance(clienteCoords.lat, clienteCoords.lon, costureiraCoords.lat, costureiraCoords.lon);

    L.popup()
        .setLatLng([(clienteCoords.lat + costureiraCoords.lat) / 2, (clienteCoords.lon + costureiraCoords.lon) / 2])
        .setContent(`Distância até ${costureiraNome}: ${distance.toFixed(2)} km`)
        .openOn(map);
}
var map = L.map('map').setView([-24.9555, -53.4552], 12);
class MapaCostureiras {
    constructor(mapId) {
        this.map = map
        this.markers = [];
        this.costureiras = [];
        this.initMap();
    }

    initMap() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);
        this.carregarDados();
    }

    async carregarDados() {
        this.costureiras = [
            { nome: "Ana Bordadeira", endereco: "Floresta, Cascavel, PR", servico: "confecção" },
            { nome: "Clara Costureira", endereco: "Riviera, Cascavel, PR", servico: "bordado" },
            { nome: "Maria das Costuras", endereco: "Morumbi, Cascavel, PR", servico: "ajuste" }
        ];
        this.atualizarFiltros();
        this.exibirCostureiras();
        // this.adicionarMarkers();
    }

    atualizarFiltros() {
        const servicos = [...new Set(this.costureiras.map(c => c.servico))];
        const localizacoes = [...new Set(this.costureiras.map(c => c.endereco.split(',')[0]))];

        this.preencherFiltro("servico", servicos, "tipo de serviço");
        this.preencherFiltro("localizacao", localizacoes, "localização");
    }

    preencherFiltro(id, valores, placeholder) {
        const select = document.getElementById(id);
        select.innerHTML = `<option value="todos">Todos os ${placeholder}</option>`;
        valores.forEach(valor => {
            const option = document.createElement("option");
            option.value = valor.toLowerCase();
            option.textContent = valor;
            select.appendChild(option);
        });
    }

    filtrarCostureiras() {
        const servicoFiltro = document.getElementById("servico").value;
        const localizacaoFiltro = document.getElementById("localizacao").value;

        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        const costureirasFiltradas = this.costureiras.filter(costureira => {
            const servicoCond = servicoFiltro === "todos" || costureira.servico.toLowerCase() === servicoFiltro;
            const localizacaoCond = localizacaoFiltro === "todos" || costureira.endereco.toLowerCase().includes(localizacaoFiltro);
            return servicoCond && localizacaoCond;
        });

        this.exibirCostureiras(costureirasFiltradas);
        costureirasFiltradas.forEach(async costureira => {
            const coords = await this.getCoordinates(costureira.endereco);
            this.addMarker(coords.lat, coords.lon, costureira);
            enderecoatual= document.getElementById('location').value;
            const clienteCoords = await this.getCoordinates(enderecoatual);
            drawPolylineAndShowDistance(clienteCoords, coords, costureira.nome);
        });
        
        
    }

    exibirCostureiras(lista = this.costureiras) {
        const container = document.getElementById("costureiras-section");
        container.innerHTML = "";
        lista.forEach(costureira => {
            const card = this.criarCard(costureira);
            // container.appendChild(card);
        });
    }

    criarCard(costureira) {
        const div = document.createElement("div");
        div.classList.add("costureira-card");
        div.innerHTML = `
            <h3>${costureira.nome}</h3>
            <p>Serviços: ${costureira.servico}</p>
            <p>Localização: ${costureira.endereco}</p>
            <button>Ver Perfil</button>
        `;
        return div;
    }

    async getCoordinates(endereco) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        }
        throw new Error("Endereço não encontrado");
    }


    addMarker(lat, lon, costureira) {
    const marker = L.marker([lat, lon]).addTo(this.map)
    .bindPopup(costureira.nome)
    .openPopup();
    this.markers.push(marker);

    // Associar evento de clique diretamente ao marcador com o costureira correto
    marker.addEventListener("click", () => {
    this.abrirModal(costureira);
});
}
    

    abrirModal(costureira) {
        const modal = document.getElementById('modal');
        const modalContentBody = document.getElementById('modal-content-body');
        modalContentBody.innerHTML = `
            <h3>${costureira.nome}</h3>
            <p>Serviços: ${costureira.servico}</p>
            <p>Localização: ${costureira.endereco}</p>
            <button>Ver Perfil</button>
        `;
        modal.style.display = "flex";
    }

    fecharModal() {
        const modal = document.getElementById('modal');
        modal.style.display = "none";
    }

    
}

const app = new MapaCostureiras('map');

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
                
                L.circle([lat, lon], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(map);
                // Desenha a linha poliline e exibe a distância
                
                
            } else {
                alert('Localização não encontrada.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar localização:', error);
            alert('Erro ao buscar localização. Tente novamente.');
        });
        

}



