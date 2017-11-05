
'use strict';

window.onload = function () {
    window.DatXeApp = new DatXeApp();
};


// Initializes DatxeApp.
function DatXeApp() {
    this.checkSetup();
    //field
    this.customerName = document.getElementById('customerName');
    this.telephone = document.getElementById('telephone');
    this.type = document.getElementById('type');
    this.address = document.getElementById('address');
    this.submitButton = document.getElementById('submit');

    //even
    this.submitButton.addEventListener('submit', this.saveMessage.bind(this));
  

    this.initFirebase();
}

// thiết lập xác thực firebase with google
DatXeApp.prototype.initFirebase = function () {
    this.database = firebase.database();
    this.storage = firebase.storage();
};




// gửi new message và push lên firebase database
DatXeApp.prototype.saveMessage = function (e) {
    e.preventDefault();
    this.customerInfo = this.database.ref('customer');
    // Check that the user entered a message and is signed in.
    if (this.customerName.value && this.address.value && this.telephone.value && this.type.value) {
       
        // Add a new message entry to the Firebase Database.
        this.customerInfo.push({
            customerName: this.customerName.value,
            address: this.address.value,
            type: this.type.value,
            telephone: this.telephone.value
        }).then(function () {
            // Clear message text field and SEND button state.
            DatXeApp.resetMaterialTextfield(this.customerName);
            DatXeApp.resetMaterialTextfield(this.address);
            DatXeApp.resetMaterialTextfield(this.type);
            DatXeApp.resetMaterialTextfield(this.telephone);
          
        }.bind(this)).catch(function (error) {
            console.error('Error writing new record to Firebase Database', error);
        });
    }
};

DatXeApp.prototype.checkSetup = function () {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
};



