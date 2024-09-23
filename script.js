// Variáveis globais
const takePictureButton = document.getElementById('take-picture');
const gallery = document.getElementById('gallery');
const mapElement = document.getElementById('map');
let map;

// Função para obter a localização
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Função para mostrar a localização no mapa
function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  
  // Inicializa o mapa
  initMap(lat, lng);
}

// Função para inicializar o mapa
function initMap(lat, lng) {
  const location = { lat: lat, lng: lng };
  
  map = new google.maps.Map(mapElement, {
    zoom: 15,
    center: location,
  });
  
  new google.maps.Marker({
    position: location,
    map: map,
  });
}

// Função para acessar a câmera e tirar uma foto
function takePicture() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // Adicione um botão para capturar a foto
      const captureButton = document.createElement('button');
      captureButton.textContent = 'Capturar';
      captureButton.onclick = () => {
        // Lógica para capturar a foto e armazenar os dados
      };
      document.body.appendChild(captureButton);
    })
    .catch(err => {
      console.error("Erro ao acessar a câmera:", err);
    });
}

// Evento de clique no botão "Tirar Foto"
takePictureButton.addEventListener('click', takePicture);

// Chamar a função para obter a localização inicial
getLocation();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.error('Erro ao registrar o Service Worker:', error);
      });
  });
}
