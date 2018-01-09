<<<<<<< HEAD
<<<<<<< HEAD
﻿
var directionsService;
var directionsDisplay;
=======
﻿var geocoder;
var map;
>>>>>>> parent of d4e2111... complete app3
=======
﻿var geocoder;
var map;
>>>>>>> parent of d4e2111... complete app3


var grabinfo = [];
var motorbikegrab = [];
var customergrab = [];
var listcustomer = [];


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


<<<<<<< HEAD
<<<<<<< HEAD
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

=======
function initialize() {
>>>>>>> parent of d4e2111... complete app3
=======
function initialize() {
>>>>>>> parent of d4e2111... complete app3

    loadListCustomer();

    loadDataGrabInfo();


}

function loadListCustomer() {
   
    firebase.messagesRef = database.ref('customer');

    firebase.messagesRef.off();


    var setMessage = function (data) {
        var val = data.val();

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
        var data = [data.key, val.customerName, val.telephone, val.status, val.type, val.address];
        listcustomer.push(data);
>>>>>>> parent of d4e2111... complete app3
=======
        var data = [data.key, val.customerName, val.telephone, val.status, val.type, val.address];
        listcustomer.push(data);
>>>>>>> parent of d4e2111... complete app3
    }.bind(this);


    firebase.messagesRef.on('child_added', setMessage);
    firebase.messagesRef.on('child_changed', setMessage);
}

function loadDataGrabInfo() {

    firebase.messagesRef = database.ref('grabinfo');

<<<<<<< HEAD
    firebase.messagesRef.off();
    var setMessage = function (data) {
        var val = data.val();

        saveDatabaseGrab(data.key, val.customer, val.date, val.motorbike, val.status);

=======
    this.messagesRef.off();


    var setMessage = function (data) {
        var val = data.val();

        this.saveDatabaseGrab(data.key, val.customer, val.date, val.motorbike, val.status);
<<<<<<< HEAD
>>>>>>> parent of d4e2111... complete app3
=======
>>>>>>> parent of d4e2111... complete app3
    }.bind(this);


    firebase.messagesRef.on('child_added', setMessage);
    firebase.messagesRef.on('child_changed', setMessage);

}

function saveDatabaseGrab(key, customer, date, motorbike, status) {

    var data = [key, customer, date, motorbike, status];
    grabinfo.push(data);
    loadCustomerInfo(customer);
    loadmotorbikeInfo(motorbike);

    setTimeout(function () {
        loadTable();

    }, 2000);


}

var loadCustomerInfo = function (customer) {

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    var customerRef = this.database.ref('customer');

    this.messagesRef.off();
    var data;
    customerRef.on("child_added", retVal => {
        var childKey = retVal.key;
        if (childKey == customer) {

            data = [retVal.val().customerName, retVal.val().address, retVal.val().type, retVal.val().telephone];
            customergrab.push(data);
        }

    });

>>>>>>> parent of d4e2111... complete app3
=======
    var customerRef = this.database.ref('customer');

    this.messagesRef.off();
    var data;
    customerRef.on("child_added", retVal => {
        var childKey = retVal.key;
        if (childKey == customer) {

            data = [retVal.val().customerName, retVal.val().address, retVal.val().type, retVal.val().telephone];
            customergrab.push(data);
        }

    });

>>>>>>> parent of d4e2111... complete app3

}
var loadmotorbikeInfo = function (motorbike) {

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    var motorbikeRef = this.database.ref('motorbike');
>>>>>>> parent of d4e2111... complete app3
=======
    var motorbikeRef = this.database.ref('motorbike');
>>>>>>> parent of d4e2111... complete app3

    this.messagesRef.off();
    var data;
    motorbikeRef.on("child_added", retVal => {
        var childKey = retVal.key;
        if (childKey == motorbike) {

            data = [retVal.val().biensoxe, retVal.val().chuxe, retVal.val().diachi, retVal.val().kinhdo,
                 retVal.val().vido, retVal.val().loaixe];
            motorbikegrab.push(data);
        }
<<<<<<< HEAD
=======

    });
>>>>>>> parent of d4e2111... complete app3

    });

<<<<<<< HEAD
<<<<<<< HEAD
//onclick='calculateAndDisplayRoute("+currentMotor[3]+","+customer[5]+")'
function getCurrentCustomer(key) {
    for (var i = 0; i < listcustomer.length; i++) {
=======

>>>>>>> parent of d4e2111... complete app3
=======
>>>>>>> parent of d4e2111... complete app3

}



function loadTable() {

    

    $("#infograb tr:gt(0)").remove();

    for (var i = 0; i < grabinfo.length; i++) {
        var customer = customergrab[i];
        var motorbike = motorbikegrab[i];
        var grab = grabinfo[i];

        if (grab[3] != "" || (grab[3]) != null)//đã có xe
        {
            $("#detailgrab").append("<tr><td>" + customer[0] + "</td>\
<td>" + getMMDDYY(grab[2]) + "</td>\
<td>" + customer[1] + "</td>\
<td>" + (customer[2] == "1" ? "Thường" : "Premium") + "</td>\
<td>" + customer[3] + "</td>\
<td>" + "Đã có xe" + "</td>\
<td>" + motorbike[1] + "</td>\
<td>" + motorbike[0] + "</td>\
<td>" + "<a class='btn btn-primary' data-id=" + grab[0] + ">View Map</a>" + "</td>\
</tr>");
<<<<<<< HEAD
        }
        else { //chua có xe
            $("#detailgrab").append("<tr><td>" + customer[0] + "</td>\
<td>" + getMMDDYY(grab[2]) + "</td>\
<td>" + customer[1] + "</td>\
<td>" + (customer[2] == "1" ? "Thường" : "Premium") + "</td>\
<td>" + customer[3] + "</td>\
<td>" + "Đã định vị" + "</td>\
</tr>");
        }
=======
        }
        else { //chua có xe
            $("#detailgrab").append("<tr><td>" + customer[0] + "</td>\
<td>" + getMMDDYY(grab[2]) + "</td>\
<td>" + customer[1] + "</td>\
<td>" + (customer[2] == "1" ? "Thường" : "Premium") + "</td>\
<td>" + customer[3] + "</td>\
<td>" + "Đã định vị" + "</td>\
</tr>");
        }
>>>>>>> parent of d4e2111... complete app3

    }

    //load danh sách khách hàng còn lại
    for (var i = 0; i < listcustomer.length; i++) {
        var customer = listcustomer[i];
        if (!checkCustomer(customer[0])) {
            $("#detailgrab").append("<tr><td>" + customer[1] + "</td>\
<td>" + "" + "</td>\
<td>" + customer[5] + "</td>\
<td>" + (customer[2] == "1" ? "Thường" : "Premium") + "</td>\
<td>" + customer[2] + "</td>\
<td>" + "Chưa định vị" + "</td>\
<td>" + "" + "</td>\
<td>" + "" + "</td>\
<td>" + "" + "</td>\
</tr>");
        }
    }
}
function checkCustomer(customer) {
    for (var i = 0; i < grabinfo.length; i++) {
        var grab = grabinfo[i];
        if (customer == grab[1])//đã có trong grabinfo
        {
            return true;

        }
    }
    return false;
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
<<<<<<< HEAD
<<<<<<< HEAD


//$("tbody").off('click', 'a.direction').on("click", "a.direction", function () {

//    var btn = $(this);         
                
//    calculateAndDisplayRoute(btn.data('ad1'), btn.data('ad2'));

//});



//Array.from(classname).forEach(function(element) {
//    element.addEventListener('click', test);
//});


//export * from './main.js';
=======
>>>>>>> parent of d4e2111... complete app3
=======
>>>>>>> parent of d4e2111... complete app3
