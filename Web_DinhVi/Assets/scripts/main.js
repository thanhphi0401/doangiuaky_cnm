var geocoder;
var map;
var markers = [];

var motorbikes = [];
var listfreemotorbikes = [];
var nearestmotorbikes = [];

var customers = [];
var serviceDistance;

// thiết lập xác thực firebase with google
var database = firebase.database();
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
}


function initialize() {

    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(10.8230989, 106.6296638);
    var mapOptions = {
        zoom: 9,
        center: latlng,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    loadUnlocatedCustomer();
    loadDataMotorbike();

    //setTimeout(function () {
    //    loadListDinhVi();
    //}, 1000);

}


function loadDataMotorbike() {

    this.messagesRef = this.database.ref('motorbike');

    this.messagesRef.off();


    var setMessage = function (data) {
        var val = data.val();

        this.saveDatabase(data.key, val.biensoxe, val.chuxe, val.diachi, val.kinhdo, val.vido, val.loaixe, val.status);
    }.bind(this);


    this.messagesRef.limitToLast(100).on('child_added', setMessage);
    this.messagesRef.limitToLast(100).on('child_changed', setMessage);



}

function saveDatabase(key, biensoxe, chuxe, diachi, kinhdo, vido, loaixe, status) {

    var data = [key, biensoxe, chuxe, diachi, kinhdo, vido, loaixe, status];
    motorbikes.push(data);

}


var loadUnlocatedCustomer = function () {

    this.messagesRef = this.database.ref('customer');

    this.messagesRef.off();


    var setMessage = function (data) {
        var val = data.val();

        this.saveCustomerData(data.key, val.address, val.customerName, val.status, val.telephone, val.type);

    }.bind(this);

    this.messagesRef.on('child_added', setMessage);
    this.messagesRef.on('child_changed', setMessage);
    //this.messagesRef.on('child_removed', setMessage);//không xét tới


}

function saveCustomerData(key, address, customerName, status, tel, type) {
    var data = [key, address, customerName, status, tel, type];

    if (status == "0") {
        customers.push(data);

        $('#selection').append($('<option>', {
            value: data[0],
            text: data[1]
        }));
        //setTimeout(function () {
        //    console.log(customers.length);

        //}, 1000);
    }
    else if (status == "1") {
        //khi định vị xong là change từ 0->1 (child_changed)
        //xóa khỏi select option list và customers

        $("#selection option[value=" + key + "]").remove();
    }

}

function loadListDinhVi() {
    //load vô list
    for (var i = 0; i < customers.length; i++) {

        var customer = customers[i];

        $('#selection').append($('<option>', {
            value: customer[1],
            text: customer[1]
        }));

    }
}



function updateMarkerPosition(latLng) {
    //in ra vị trí trong quá trình drag

    //console.log(latLng.lat() + "===" + latLng.lng());

}
function geocodePosition(pos) {

    console.log(pos.lat());

    geocoder.geocode({
        latLng: pos
    }, function (responses) {
        if (responses && responses.length > 0) {
            //cập nhật lại dịa chỉ khách hàng
            console.log(responses);
            $('#selection option:selected').text(responses[0].formatted_address);
            ////$('#selection option:selected').css('color', 'red');
            $('#selection').find('option:selected').css("background-color", "yellow");
            codeAddress(responses[0].formatted_address);
        } else {
            alert('Cannot determine address at this location.');
        }
    });
}

function codeAddress(address) {


    deleteMarkers();
    listfreemotorbikes = [];

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var markermain = new google.maps.Marker({
                map: map,
                draggable: true,
                position: results[0].geometry.location,
                title: address
            });
            map.setZoom(17);
            map.setCenter(markermain.position);

            markers.push(markermain);

            google.maps.event.addListener(markermain, 'click', function () {
                map.setZoom(17);
                map.setCenter(markermain.getPosition());
            });


            //thêm sự kiện drag
            google.maps.event.addListener(markermain, 'dragstart', function () {
                //alert("dragstart");
            });


            google.maps.event.addListener(markermain, 'drag', function () {
                // alert("drag");
                // updateMarkerPosition(markermain.getPosition());
            });

            google.maps.event.addListener(markermain, 'dragend', function (endpoint) {
                //alert("dragend");
                map.setZoom(17);
                map.setCenter(markermain.getPosition());
                geocodePosition(endpoint.latLng);

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


                if (motorbike[7] == "1") {
                    var a = new google.maps.LatLng(parseFloat(motorbike[5]), parseFloat(motorbike[4]));
                    destination.push(a);
                    listfreemotorbikes.push(motorbike);
                }


            }


            serviceDistance = new google.maps.DistanceMatrixService();
            serviceDistance.getDistanceMatrix(
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
                }, addAllMotorbikeMarker);


            function addAllMotorbikeMarker(response, status) {
                //console.log(response);
                //console.log(status);
                if (status == 'OK') {

                    var destinations = response.destinationAddresses;

                    var results = response.rows[0].elements;
                    var nearestDistance = 2000;

                    for (var j = 0; j < results.length; j++) {
                        var element = results[j];
                        var distance = element.distance.value;

                        var address_ = destinations[j];

                        //tim diem gan nhat
                        if (distance < nearestDistance) {
                            {
                               
                                nearestDistance = distance;
                                if (nearestmotorbikes.length > 0)
                                    nearestmotorbikes.pop();
                                nearestmotorbikes.push(listfreemotorbikes[j]);
                               
                            }
                        }


                        if (distance < 2000) {
                            geocoder.geocode({ 'address': destinations[j] }, function (results, status) {
                                if (status == 'OK') {

                                    var marker = new google.maps.Marker({
                                        map: map,
                                        position: results[0].geometry.location,
                                        icon: image,
                                        shape: shape,
                                        title: address_
                                    });
                                    markers.push(marker);


                                }
                                else {
                                    alert('Geocode was not successful for the following reason: ' + status);
                                }
                            });

                        }
                        //console.log(distance);
                        //console.log(destinations[j]);
                        setMapOnAll(markers);

                    }
                }   
            }
           

        }
        else {
            alert('Không tìm thấy !');
            console.log(status);
        }

    });
}

//dịnh vị
function locatesleep(key) {
    myVar = setTimeout(locate, 1300, key);
}


function locate(key)//định vị điểm và gửi cho xe
{
  

    var customerRef = database.ref('customer');
    var postData;
    //lay ref child can thay doi
    customerRef.on("child_added", retVal => {
        var childKey = retVal.key;
        if (key == childKey) {
            //create post entity
            postData = {
                customerName: retVal.val().customerName,
                address: retVal.val().address,
                type: retVal.val().type,
                telephone: retVal.val().telephone,
                status: "1"
            };
        }
    });

    try {
        //tien hanh update customer (status =1 đã đc định vị)
        var childRef = customerRef.child(key);
        childRef.update(postData);

    }
    catch (err) {
        console.log(err);
    }


    //gui thông tin và chọn xe
    if (nearestmotorbikes.length == 0 || nearestmotorbikes == null) {
        //không có xe nào
        pushgrabinfo(key, "", Date.now(), 1);


    }
    else {
        
        console.log(nearestmotorbikes);
        pushgrabinfo(key, nearestmotorbikes[0][0], Date.now(), 1);

    }

    nearestmotorbikes = [];
   
    deleteMarkers();


}


function setMapOnAll(map) {

    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function pushgrabinfo(customer, motorbike, date, status) {
    this.customerRef = this.database.ref('grabinfo');
    this.customerRef.push({
        customer: customer,
        date: date,
        motorbike: motorbike,
        status: "1"
    }).then(function () {
        bootbox.alert("Định vị thành công");
    }.bind(this)).catch(function (error) {
        console.error('Error writing new message to Firebase Database', error);
        bootbox.alert("<span style='color:red;'>Có lỗi xảy ra. Vui lòng thử lại</span>");
    });
}