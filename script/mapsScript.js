
var map;
var markers = [];


window.onload = function () {
    initMap();
};


function initMap() {
    var center = { lat: -5.799273, lng: -35.199844 };


    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 12
    });


    map.addListener('click', function (event) {
        addMarker(event.latLng);
        openAddPinModal(event.latLng);
        
    });
}


function addMarker(location) {

    var marker = new google.maps.Marker({
        position: location,
        map: map
    });


    markers.push(marker);


    updateCoordinatesPanel(marker);
}

const formularioPin = document.querySelector(".modal-dialog");
const mapa = document.querySelector("#map");
const fechar = document.querySelector(".close");
const salvar = document.querySelector(".salvar-pin");

mapa.addEventListener("click", () => {
    formularioPin.setAttribute("data-pin", "mostrar");
  fechar.setAttribute("data-pin", "mostrar-fechar");
});

fechar.addEventListener("click", () => {
    formularioPin.setAttribute("data-pin", "esconder");
  fechar.setAttribute("data-pin", "esconder");
});

salvar.addEventListener("click", () => {
    formularioPin.setAttribute("data-pin", "esconder");
});

function updateCoordinatesPanel(marker) {
    var panel = document.getElementById('coordinates-panel');
    panel.innerHTML = '';


    var coordinates = marker.getPosition();
    var lat = coordinates.lat().toFixed(6);
    var lng = coordinates.lng().toFixed(6);


    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': coordinates }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                var addressComponents = results[0].address_components;
                var city, neighborhood;


                for (var j = 0; j < addressComponents.length; j++) {
                    var types = addressComponents[j].types;

                    if (types.includes('locality')) {
                        city = addressComponents[j].long_name;
                    }

                    if (types.includes('sublocality')) {
                        neighborhood = addressComponents[j].long_name;
                    }
                }


                var coordinateItem = document.createElement('div');
                coordinateItem.innerHTML = 'Latitude: ' + lat + ', Longitude: ' + lng

                panel.appendChild(coordinateItem);
            }
        }
    });
}


function openAddPinModal(location) {
    var latitudeInput = document.getElementById('latitude');
    var longitudeInput = document.getElementById('longitude');


    latitudeInput.value = location.lat().toFixed(6);
    longitudeInput.value = location.lng().toFixed(6);


    $('#addPinModal').modal('show');
}


document.getElementById('addPinForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var latitude = document.getElementById('latitude').value;
    var longitude = document.getElementById('longitude').value;
    var description = document.getElementById('description').value;

    var pinData = {
        latitude: latitude,
        longitude: longitude,
        description: description
    };


    fetch('http://localhost:8080/cliente/pin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pinData)
    })
        .then(function (response) {
            if (response.ok) {
                alert('Pin salvo com sucesso!');
                $('#addPinModal').modal('hide');
            } else {
                alert('Erro ao salvar o pin. Por favor, tente novamente.');
            }
        })
        .catch(function (error) {
            console.error('Erro:', error);
            
        });
});

document.getElementById("showAllBtn").addEventListener("click", function (event) {
    event.preventDefault();

    fetchPins();
});


function fetchPins() {

    fetch('http://localhost:8080/cliente/pins')
        .then(response => response.json())
        .then(data => {

            displayPins(data);
        })
        .catch(error => {

            console.error('Erro na requisição:', error);
        });
}


function displayPins(pins) {
    var resultList = document.getElementById("resultList");
    resultList.innerHTML = "";


    pins.forEach(function (pin) {
        var listItem = document.createElement("li");
        listItem.textContent = "ID: " + pin.id + ", latidude: " + pin.latitude + ", Longitude" + pin.longitude + ", descrição" + pin.description;
        resultList.appendChild(listItem);
    });
}


function buscarPinPorId(id) {
    var url = 'http://localhost:8080/cliente/pins/' + id;

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao buscar o pin');
            }
        })
        .then(function (pin) {
            document.getElementById('resultList').innerHTML = '';

            var listItem = document.createElement('li');
            listItem.textContent = `Latitude: ${pin.latitude}, Longitude: ${pin.longitude}, Descrição: ${pin.description}`;
            document.getElementById('resultList').appendChild(listItem);


            var pinLatLng = new google.maps.LatLng(pin.latitude, pin.longitude);


            var marker = new google.maps.Marker({
                position: pinLatLng,
                map: map,
                title: pin.description
            });


            map.setCenter(pinLatLng);
        })
        .catch(function (error) {
            console.error('Erro na busca do pin:', error);
        });
}



document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var searchId = document.getElementById('searchId').value;
    buscarPinPorId(searchId);
});

