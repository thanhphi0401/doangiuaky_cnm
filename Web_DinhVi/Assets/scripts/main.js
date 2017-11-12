var geocoder;
var map;
     var database = firebase.database();
checkSetup = function () {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
}

initialize=function() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(10.8230989, 106.6296638);
    var mapOptions = {
        zoom: 10,
        center: latlng
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    loadUnlocatedCustomer();
}

loadUnlocatedCustomer=function() {
    var textVal = document.getElementById('testVal');
    var customerRef = database.ref('customer');
    var i = 2;
    //retrieve data from firebase
    customerRef.on("child_added", retVal => {
        var status = retVal.child("status").val();
        var address = retVal.child("address").val();
        var customerName = retVal.child("customerName").val();
        var telephone = retVal.child("telephone").val();

        //adđ html code
       if (status == "0") {
           $("#selection").append("<option value=" + i + ">" + address + "</option>");
           i++;
        }
    });
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

function submitAddress() {
    //get data from #selected and push to #address
    var selectedCustomerAddress = document.getElementById('selection');
    var inputAdress = document.getElementById('address');
    inputAdress.value = selectedCustomerAddress.val();


    //update status field = 
    customerRef.on('child_added', retVal => {
        var address = retVal.child("address").val();
        if (address == selectedCustomerAddress.val()) {
            customerRef.
        }
    })
}