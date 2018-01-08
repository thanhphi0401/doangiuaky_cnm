
//// Initialize Firebase
//var config = {
//    apiKey: "AIzaSyBPRUwT-TI81VkXmC_MReaj8msT-8NTxEY",
//    authDomain: "doangiuakiapp1.firebaseapp.com",
//    databaseURL: "https://doangiuakiapp1.firebaseio.com",
//    projectId: "doangiuakiapp1",
//    storageBucket: "doangiuakiapp1.appspot.com",
//    messagingSenderId: "208748898412"
//};
//firebase.initializeApp(config);
var directionsService;
var directionsDisplay;


var grabinfo = [];
var currentMoto;
var currentDriverEmail;

var listcustomer = [];


// thiết lập xác thực firebase with google
let  database = firebase.database();

function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
}


export function initialize() {
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


    loadListCustomer();

    //get current email driver
    $.ajax({
        url: '/Home/login',
        type: "GET",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            currentDriverEmail=response.Email;
            console.log(response.Email);
        },
        error: function (error) {
            console.log(error);
        }
    });

    //
    loadCurrentMotobike();

    loadDataGrabInfo();

    //setTimeout(function () {
    //    loadTable();
    //}, 1500);
}

function loadListCustomer() {
   
    firebase.messagesRef = database.ref('customer');

    firebase.messagesRef.off();


    var setMessage = function (data) {
        var val = data.val();

        var customer = [data.key, val.customerName, val.telephone, val.status, val.type, val.address];
        listcustomer.push(customer);
        

    }.bind(this);


    firebase.messagesRef.on('child_added', setMessage);
    firebase.messagesRef.on('child_changed', setMessage);
}

function loadCurrentMotobike() {
    firebase.messagesRef =database.ref('motorbike');

    firebase.messagesRef.off();


    var setMessage = function (data) {
        var val = data.val();
        if(data.key==currentDriverEmail)
        {
            currentMoto = [data.key, val.biensoxe, val.chuxe, val.diachi, val.kinhdo, val.vido];
            return;
        }
        
    }.bind(this);


    firebase.messagesRef.on('child_added', setMessage);
    firebase.messagesRef.on('child_changed', setMessage);
}

function loadDataGrabInfo() {

    firebase.messagesRef = database.ref('grabinfo');

    firebase.messagesRef.off();
    var setMessage = function (data) {
        var val = data.val();

        saveDatabaseGrab(data.key, val.customer, val.date, val.motorbike, val.status);

    }.bind(this);


    firebase.messagesRef.on('child_added', setMessage);
    firebase.messagesRef.on('child_changed', setMessage);

}

function saveDatabaseGrab(key, customer, date, motorbike, status) {

    var data = [key, customer, date, motorbike, status];
    grabinfo.push(data);



}


//onclick='calculateAndDisplayRoute("+currentMotor[3]+","+customer[5]+")'
function getCurrentCustomer(key) {
    for (var i = 0; i < listcustomer.length; i++) {

        if (listcustomer[i][0] == key) {
            return listcustomer[i];
        }
    }
}

function getCurrentGrab(key) {
    for (var i = 0; i < grabinfo.length; i++) {

        if (grabinfo[i][1] == key) {
            return grabinfo[i];
        }
    }

}
function getCurrentMotor(key) {
    for (var i = 0; i < listmotorbike.length; i++) {

        if (listmotorbike[i][0] == key) {
            return listmotorbike[i];
        }
    }
}

function getMMDDYY(ticks) {
    var date = new Date(ticks);
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var yy = new String(date.getFullYear()).substring(2);
    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;
    return "" + mm + "/" + dd + "/" + +yy;
}


//$("tbody").off('click', 'a.direction').on("click", "a.direction", function () {

//    var btn = $(this);         
                
//    calculateAndDisplayRoute(btn.data('ad1'), btn.data('ad2'));

//});



//Array.from(classname).forEach(function(element) {
//    element.addEventListener('click', test);
//});


//export * from './main.js';