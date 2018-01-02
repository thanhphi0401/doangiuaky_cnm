var directionsService;
var directionsDisplay;

function calculateAndDisplayRoute(p1, p2) {
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

   
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 10.8230989, lng: 106.6296638 }
    });
    directionsDisplay.setMap(map);

    $("#mymap").on("shown.bs.modal", function () {
        google.maps.event.trigger(map, "resize");
    });

    directionsService.route({
        origin: p1,
        destination: p2,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            console.log(response);
            directionsDisplay.setDirections(response);
        } else {
            alert('Directions request failed due to ' + status);
        }
    });
}