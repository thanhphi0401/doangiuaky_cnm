var geocoder;
var map;
function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(10.8230989, 106.6296638);
    var mapOptions = {
        zoom: 10,
        center: latlng
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}



function codeAddress(address) {

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}