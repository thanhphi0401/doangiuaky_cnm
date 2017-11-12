﻿var geocoder;
var map;

var motorbikes = [];

//load danh sách xe và hiển thị bản đồ


// thiết lập xác thực firebase with google
var database = firebase.database();
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
};

function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(10.8230989, 106.6296638);
    var mapOptions = {
        zoom: 10,
        center: latlng
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    loadData();
}


// load dữ liệu chat lịch sử
function loadData() {

    this.messagesRef = this.database.ref('motorbike');

    this.messagesRef.off();


    var setMessage = function (data) {
        var val = data.val();

        this.saveDatabase(data.key, val.biensoxe, val.chuxe, val.diachi, val.kinhdo, val.vido, val.loaixe, val.status);
    }.bind(this);


    this.messagesRef.limitToLast(100).on('child_added', setMessage);
    this.messagesRef.limitToLast(100).on('child_changed', setMessage);

};

function saveDatabase(key, biensoxe, chuxe, diachi, kinhdo, vido, loaixe, status) {
    //console.log(key + " " + biensoxe + " " + diachi + " " + kinhdo + " " + vido + " " + loaixe + " " + status);
    //console.log("==============================");

    var data = [biensoxe, chuxe, diachi, kinhdo, vido, loaixe, status];
    motorbikes.push(data);

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

    var image = {
        url: "/Assets/moto.png",
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };

    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };
    var origin = new Array();
    origin.push(address);

    var destination = new Array();
    for (var i = 0; i < motorbikes.length; i++) {
        var motorbike = motorbikes[i];

        //showw toan bo xe

        //var marker = new google.maps.Marker({
        //    position: { lat: parseFloat(motorbike[4]), lng: parseFloat(motorbike[3]) },
        //    map: map,
        //    icon: image,
        //    shape: shape,
        //    title: motorbike[1]
        //    //zIndex: beach[3]
        //});

        //show 10 xe gan nhat: 300m-600m-1km

        if (motorbike[6] == "1") {
            var a = new google.maps.LatLng(parseFloat(motorbike[4]), parseFloat(motorbike[3]));
            destination.push(a);
        }

    }


    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
          origins: origin,
          destinations: destination,
          travelMode: 'DRIVING',
          drivingOptions: {
              departureTime: new Date(Date.now()),
              trafficModel: 'bestguess'
          },
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: true,
          avoidTolls: true,
      }, callback);



    function callback(response, status) {
        console.log(response);
        console.log(status);

        if (status == 'OK') {

            var destinations = response.destinationAddresses;

            var results = response.rows[0].elements;
            for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.value;

                if (distance < 3000) {
                    geocoder.geocode({ 'address': destinations[j] }, function (results, status) {
                        if (status == 'OK') {
                            map.setCenter(results[0].geometry.location);
                            var marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location,
                                icon: image,
                                shape: shape,
                                title: destinations[j]
                            });
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                        }
                    });

                }
                console.log(distance);
                console.log(destinations[j]);

            }

        }

    }

}