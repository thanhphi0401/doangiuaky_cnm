
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

import Notify from './Notify.vue';

components: {
    Notify
}

Vue.use(Notify)


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
    //var map = new google.maps.Map(document.getElementById('map'), {
    //    zoom: 12,
    //    center: { lat: 10.8230989, lng: 106.6296638 }
    //});
    //directionsDisplay.setMap(map);

    //$("#mymap").on("shown.bs.modal", function () {
    //    google.maps.event.trigger(map, "resize");
    //});


    loadListCustomer();

    //get current email driver
    $.ajax({
        url: '/Home/getCurrentDriver',
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
       
        if(val.email==currentDriverEmail)
        {
            currentMoto = [data.key, val.biensoxe, val.chuxe, val.diachi, val.kinhdo, val.vido,val.email];
           // console.log(currentMoto);
            
        }
        
    }.bind(this);


    firebase.messagesRef.on('child_added', setMessage);
    firebase.messagesRef.on('child_changed', setMessage);
}

export function loadDataGrabInfo() {

    firebase.messagesRef = database.ref('grabinfo');

    firebase.messagesRef.off();
    var setMessage = function (data) {
        var val = data.val();

        saveDatabaseGrab(data.key, val.customer, val.date, val.motorbike, val.status);

    }.bind(this);


    firebase.messagesRef.on('child_added', setMessage);
    firebase.messagesRef.on('child_changed', setMessage);

}

export function saveDatabaseGrab(key, customer, date, motorbike, status) {

    var data = [key, customer, date, motorbike, status];
    if(motorbike==currentMoto[0])//nếu là chuyến grab cho thằng driver hiện tại thì push thông báo
    {
        grabinfo.push(data);

        var currentcustomer=getCurrentCustomer(customer);
        //setTimeout(function(){ alert("Hello"); }, 3000);
        //lấy thông tin khách hàng

        //debugger
//        var html="<div><div class=\"w3-cell\" style=\"width:30%\">\
//                    <img class=\"w3-circle img-responsive\" src=\"/Assets/Image/giphy.gif\" style=\"width:100%\">\
//                </div>\
//<div class=\"w3-cell w3-container\">\
//<h2>Khách hàng:"+currentcustomer[1]+"</h2>\
//<p>Địa chỉ:"+currentcustomer[5]+"</p>\
//<div id=\"approvearea\">\
//<Notify />\
//<a href=\"#\" class=\"btn btn-danger deny\">Từ chối đi</a>\
//</div><br/><br/></div> <audio autoplay loop controls=\"controls\" hidden>\
//                <source src=\"/Assets/Image/messenger.mp3\"   type=\"audio/mpeg\"/>\
//                </audio></div>";

//        var res = Vue.compile(html)
//        new Vue({
//            render: res.render,
//            staticRenderFns: res.staticRenderFns
//        }).$mount('#notify')


//        $("#notify").append("<div class=\"w3-cell\" style=\"width:30%\">\
//                    <img class=\"w3-circle img-responsive\" src=\"/Assets/Image/giphy.gif\" style=\"width:100%\">\
//                </div>\
//<div class=\"w3-cell w3-container\">\
//<h2>Khách hàng:"+currentcustomer[1]+"</h2>\
//<p>Địa chỉ:"+currentcustomer[5]+"</p>\
//<div id=\"approvearea\">\
//<a href=\"#\" id=\"approve\" class=\"btn btn-success approve\">Đồng ý</a>\
//<a href=\"#\" class=\"btn btn-danger deny\">Từ chối</a>\
//</div><br/><br/></div> <audio autoplay loop controls=\"controls\" hidden>\
//                <source src=\"/Assets/Image/messenger.mp3\"   type=\"audio/mpeg\"/>\
//                </audio>");

    }
   
}


//onclick='calculateAndDisplayRoute("+currentMotor[3]+","+customer[5]+")'
export function getCurrentCustomer(key) {
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



//$("tbody").off('click', 'a.direction').on("click", "a.direction", function () {

//    var btn = $(this);         
                
//    calculateAndDisplayRoute(btn.data('ad1'), btn.data('ad2'));

//});



//Array.from(classname).forEach(function(element) {
//    element.addEventListener('click', test);
//});


//export * from './main.js';