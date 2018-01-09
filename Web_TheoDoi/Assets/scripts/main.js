
var directionsService;
var directionsDisplay;


var grabinfo = [];
var motorbikegrab = [];
var customergrab = [];

var listcustomer = [];
var listmotorbike = [];

var serviceDistance;

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
    var map = new google.maps.Map(document.getElementById('app'), {
        zoom: 12,
        center: { lat: 10.8230989, lng: 106.6296638 }
    });
    directionsDisplay.setMap(map);

    $("#mymap").on("shown.bs.modal", function () {
        google.maps.event.trigger(map, "resize");
    });


    loadListCustomer();
    loadListMotorbike();

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
        //add vô table luôn
        addTable(customer);

    }.bind(this);


    firebase.messagesRef.on('child_added', setMessage);
    firebase.messagesRef.on('child_changed', setMessage);
}

function loadListMotorbike() {
    firebase.messagesRef =database.ref('motorbike');

    firebase.messagesRef.off();


    var setMessage = function (data) {
        var val = data.val();

        var data = [data.key, val.biensoxe, val.chuxe, val.diachi, val.kinhdo, val.vido];
        listmotorbike.push(data);
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

    //update trạng thái table
    updateTable(data);

}



function addTable(customer) {
    //tính cả trường hợp gọi lại

    if (customer[3] == "0")//chưa đc định vị
    {
        $("#detailgrab").append("<tr id='" + customer[0] + "'><td>" + customer[1] + "</td>\
            <td>" + "" + "</td>\
            <td>" + customer[5] + "</td>\
            <td>" + (customer[2] == "1" ? "Thường" : "Premium") + "</td>\
            <td>" + customer[2] + "</td>\
            <td style='color:red'>" + "Chưa định vị" + "</td>\
            <td>" + "" + "</td>\
            <td>" + "" + "</td>\
            <td>" + "" + "</td>\
            </tr>");
    }
    else {
        //đã được định vị, lấy thông tin grab
        //debugger
        var currentGrab = getCurrentGrab(customer[0]);

        if (typeof currentGrab === 'undefined') {

            //chưa có gì
        }
        else {


            if (currentGrab[3]) {//đã có xe
                var currentMotor = getCurrentMotor(currentGrab[3]);

                $("#detailgrab").append("<tr id='" + customer[0] + "'><td>" + customer[1] + "</td>\
                <td>" + getMMDDYY(currentGrab[2]) + "</td>\
                <td>" + customer[5] + "</td>\
                <td>" + (customer[4] == "1" ? "Thường" : "Premium") + "</td>\
                <td>" + customer[2] + "</td>\
                <td style='color:green'>" + "Đã có xe" + "</td>\
                <td>" + currentMotor[2] + "</td>\
                <td>" + currentMotor[1] + "</td>\
                <td>" + "<a class='btn btn-primary direction' href='#'  data-ad1='" + currentMotor[3] + "' data-ad2='" + customer[5] + "' >View Map</a>" + "</td>\
                </tr>");

            }
            else {//chưa có xe

                $("#detailgrab").append("<tr id='" + customer[0] + "'><td>" + customer[1] + "</td>\
                <td>" + getMMDDYY(currentGrab[2]) + "</td>\
                <td>" + customer[5] + "</td>\
                <td>" + (customer[4] == "1" ? "Thường" : "Premium") + "</td>\
                <td>" + customer[2] + "</td>\
                <td style='color:blue'>" + "Đã định vị" + "</td>\
  <td>" + "" + "</td>\
            <td>" + "" + "</td>\
            <td>" + "" + "</td>\
                </tr>");
            }

        }
    }
}

function updateTable(grabinfo) {
    //get row
    //get customer info
    var customer = getCurrentCustomer(grabinfo[1]);
    var row = "#" + grabinfo[1];
    $(row).remove();


    if (grabinfo[3]) {//đã có xe
        var currentMotor = getCurrentMotor(grabinfo[3]);
        $("#detailgrab").append("<tr id='" + customer[0] + "'><td>" + customer[1] + "</td>\
                <td>" + getMMDDYY(grabinfo[2]) + "</td>\
                <td>" + customer[5] + "</td>\
                <td>" + (customer[4] == "1" ? "Thường" : "Premium") + "</td>\
                <td>" + customer[2] + "</td>\
                <td style='color:green'>" + "Đã có xe" + "</td>\
                <td>" + currentMotor[2] + "</td>\
                <td>" + currentMotor[1] + "</td>\
                <td>" + "<a class='btn btn-primary direction'   href='#' data-toggle='modal' data-target='#mymap'  data-ad1='" + currentMotor[3] + "' data-ad2='" + customer[5] + "' >View Map</a>" + "</td>\
                </tr>");

    }
    else {
        $("#detailgrab").append("<tr id='" + customer[0] + "'><td>" + customer[1] + "</td>\
                <td>" + getMMDDYY(grabinfo[2]) + "</td>\
                <td>" + customer[5] + "</td>\
                <td>" + (customer[4] == "1" ? "Thường" : "Premium") + "</td>\
                <td>" + customer[2] + "</td>\
                <td style='color:blue'>" + "Đã định vị" + "</td>\
  <td>" + "" + "</td>\
            <td>" + "" + "</td>\
            <td>" + "" + "</td>\
                </tr>");
    }

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