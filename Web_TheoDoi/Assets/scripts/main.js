var geocoder;
var map;


var grabinfo = [];
var motorbikegrab = [];
var customergrab = [];
var listcustomer = [];


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

    loadListCustomer();

    loadDataGrabInfo();


}

function loadListCustomer() {
    this.messagesRef = this.database.ref('customer');

    this.messagesRef.off();


    var setMessage = function (data) {
        var val = data.val();

        var data = [data.key, val.customerName, val.telephone, val.status, val.type, val.address];
        listcustomer.push(data);
    }.bind(this);


    this.messagesRef.on('child_added', setMessage);
    this.messagesRef.on('child_changed', setMessage);
}

function loadDataGrabInfo() {

    this.messagesRef = this.database.ref('grabinfo');

    this.messagesRef.off();


    var setMessage = function (data) {
        var val = data.val();

        this.saveDatabaseGrab(data.key, val.customer, val.date, val.motorbike, val.status);
    }.bind(this);


    this.messagesRef.on('child_added', setMessage);
    this.messagesRef.on('child_changed', setMessage);

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


}
var loadmotorbikeInfo = function (motorbike) {

    var motorbikeRef = this.database.ref('motorbike');

    this.messagesRef.off();
    var data;
    motorbikeRef.on("child_added", retVal => {
        var childKey = retVal.key;
        if (childKey == motorbike) {

            data = [retVal.val().biensoxe, retVal.val().chuxe, retVal.val().diachi, retVal.val().kinhdo,
                 retVal.val().vido, retVal.val().loaixe];
            motorbikegrab.push(data);
        }

    });



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
