
'use strict';

window.onload = function () {
    window.DatXeApp = new DatXeApp();
};


// Initializes FriendlyChat.
function DatXeApp() {
    this.checkSetup();
    // property
    this.messageList = document.getElementById('messages');
    this.messageForm = document.getElementById('message-form');
    this.messageInput = document.getElementById('message');
    this.submitButton = document.getElementById('submit');
    this.submitImageButton = document.getElementById('submitImage');
    this.imageForm = document.getElementById('image-form');
    this.mediaCapture = document.getElementById('mediaCapture');
    this.userPic = document.getElementById('user-pic');
    this.userName = document.getElementById('user-name');
    this.dropdownuser = $('#dropdownuser');
    this.signInButton = document.getElementById('sign-in');
    this.signOutButton = document.getElementById('sign-out');
    this.signInSnackbar = document.getElementById('must-signin-snackbar');

    // Saves message on form submit.
    this.messageForm.addEventListener('submit', this.saveMessage.bind(this));
    this.signOutButton.addEventListener('click', this.signOut.bind(this));
    this.signInButton.addEventListener('click', this.signIn.bind(this));

    // Toggle for the button.
    var buttonTogglingHandler = this.toggleButton.bind(this);
    this.messageInput.addEventListener('keyup', buttonTogglingHandler);
    this.messageInput.addEventListener('change', buttonTogglingHandler);

    // Events for image upload.
    this.submitImageButton.addEventListener('click', function (e) {
        e.preventDefault();
        this.mediaCapture.click();
    }.bind(this));
    this.mediaCapture.addEventListener('change', this.saveImageMessage.bind(this));

    this.initFirebase();
}

// thiết lập xác thực firebase with google
FriendlyChat.prototype.initFirebase = function () {

    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    // hiển thị name, avatar người dùng đã đăng nhập
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

};



// load dữ liệu chat lịch sử
FriendlyChat.prototype.loadMessages = function () {
    // Reference to the /messages/ database path.
    this.messagesRef = this.database.ref('messages');
    // Make sure we remove all previous listeners.
    this.messagesRef.off();


    // Loads the last 12 messages and listen for new ones.
    var setMessage = function (data) {
        var val = data.val();
        this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
    }.bind(this);
    this.messagesRef.limitToLast(12).on('child_added', setMessage);
    this.messagesRef.limitToLast(12).on('child_changed', setMessage);

};

// gửi new message và push lên firebase database
FriendlyChat.prototype.saveMessage = function (e) {
    e.preventDefault();
    // Check that the user entered a message and is signed in.
    if (this.messageInput.value && this.checkSignedInWithMessage()) {
        var currentUser = this.auth.currentUser;
        // Add a new message entry to the Firebase Database.
        this.messagesRef.push({
            name: currentUser.displayName,
            text: this.messageInput.value,
            photoUrl: currentUser.photoURL || '/Assets/images/profile_placeholder.png'
        }).then(function () {
            // Clear message text field and SEND button state.
            FriendlyChat.resetMaterialTextfield(this.messageInput);
            this.toggleButton();
        }.bind(this)).catch(function (error) {
            console.error('Error writing new message to Firebase Database', error);
        });
    }
};

// Sets the URL of the given img element with the URL of the image stored in Cloud Storage.
FriendlyChat.prototype.setImageUrl = function (imageUri, imgElement) {
    imgElement.src = imageUri;

    // If the image is a Cloud Storage URI we fetch the URL.
    if (imageUri.startsWith('gs://')) {
        imgElement.src = FriendlyChat.LOADING_IMAGE_URL; // Display a loading image first.
        this.storage.refFromURL(imageUri).getMetadata().then(function (metadata) {
            imgElement.src = metadata.downloadURLs[0];
        });
    } else {
        imgElement.src = imageUri;
    }
};

// Saves a new message containing an image URI in Firebase.
// This first saves the image in Firebase storage.
FriendlyChat.prototype.saveImageMessage = function (event) {
    event.preventDefault();
    var file = event.target.files[0];

    // Clear the selection in the file picker input.
    this.imageForm.reset();

    // Check if the file is an image.
    if (!file.type.match('image.*')) {
        var data = {
            message: 'You can only share images',
            timeout: 2000
        };
        this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
        return;
    }
    // Check if the user is signed-in
    // Check if the user is signed-in
    if (this.checkSignedInWithMessage()) {

        // We add a message with a loading icon that will get updated with the shared image.
        var currentUser = this.auth.currentUser;
        this.messagesRef.push({
            name: currentUser.displayName,
            imageUrl: FriendlyChat.LOADING_IMAGE_URL,
            photoUrl: currentUser.photoURL || '/Assets/images/profile_placeholder.png'
        }).then(function (data) {

            // Upload the image to Cloud Storage.
            var filePath = currentUser.uid + '/' + data.key + '/' + file.name;
            return this.storage.ref(filePath).put(file).then(function (snapshot) {

                // Get the file's Storage URI and update the chat message placeholder.
                var fullPath = snapshot.metadata.fullPath;
                return data.update({ imageUrl: this.storage.ref(fullPath).toString() });
            }.bind(this));
        }.bind(this)).catch(function (error) {
            console.error('There was an error uploading a file to Cloud Storage:', error);
        });
    }

};



// xử lý đăng nhập bằng google
FriendlyChat.prototype.signIn = function () {

    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
};


// đăng xuất
FriendlyChat.prototype.signOut = function () {
    this.auth.signOut();
};



// hiển thị thông tin user đã đăng nhập
FriendlyChat.prototype.onAuthStateChanged = function (user) {
    if (user) { // nếu đã đăng nhập

        var profilePicUrl = user.photoURL;   // lấy picture
        var userName = user.displayName;        //lấy name

        // Set the user's profile pic and name.
        this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
        this.userName.textContent = userName;

        // Show user's profile and sign-out button.

        this.dropdownuser.removeClass('hidden');


        // Hide sign-in button.
        this.signInButton.setAttribute('hidden', 'true');

        // We load currently existing chant messages.
        this.loadMessages();

        // We save the Firebase Messaging Device token and enable notifications.
        this.saveMessagingDeviceToken();
    }
    else { // chưa đăng nhập
        // Hide user's profile and sign-out button.


        this.dropdownuser.addClass('hidden');

        // Show sign-in button.
        this.signInButton.removeAttribute('hidden');
    }
};

// check login chưa?
FriendlyChat.prototype.checkSignedInWithMessage = function () {


    if (this.auth.currentUser) {
        return true;
    }
    var data = {
        message: 'You must sign-in first',
        timeout: 2000
    };
    this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
    return false;
};

// Saves the messaging device token to the datastore.
FriendlyChat.prototype.saveMessagingDeviceToken = function () {
    // TODO(DEVELOPER): Save the device token in the realtime datastore
};

// Requests permissions to show notifications.
FriendlyChat.prototype.requestNotificationsPermissions = function () {
    // TODO(DEVELOPER): Request permissions to send notifications.
};

// Resets the given MaterialTextField.
FriendlyChat.resetMaterialTextfield = function (element) {
    element.value = '';
    element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// Template for messages.
FriendlyChat.MESSAGE_TEMPLATE =
    '<div class="message-container">' +
    '<div class="spacing"><div class="pic"></div></div>' +
    '<div class="message"></div>' +
    '<div class="name"></div>' +
    '</div>';

// A loading image URL.
FriendlyChat.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Displays a Message in the UI.
FriendlyChat.prototype.displayMessage = function (key, name, text, picUrl, imageUri) {
    var div = document.getElementById(key);
    // If an element for that message does not exists yet we create it.
    if (!div) {
        var container = document.createElement('div');
        container.innerHTML = FriendlyChat.MESSAGE_TEMPLATE;
        div = container.firstChild;
        div.setAttribute('id', key);
        this.messageList.appendChild(div);
    }
    if (picUrl) {
        div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
    }
    div.querySelector('.name').textContent = name;
    var messageElement = div.querySelector('.message');
    if (text) { // If the message is text.
        messageElement.textContent = text;
        // Replace all line breaks by <br>.
        messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
    } else if (imageUri) { // If the message is an image.
        var image = document.createElement('img');
        image.addEventListener('load', function () {
            this.messageList.scrollTop = this.messageList.scrollHeight;
        }.bind(this));
        this.setImageUrl(imageUri, image);
        messageElement.innerHTML = '';
        messageElement.appendChild(image);
    }
    // Show the card fading-in.
    setTimeout(function () { div.classList.add('visible') }, 1);
    this.messageList.scrollTop = this.messageList.scrollHeight;
    this.messageInput.focus();
};

// Enables or disables the submit button depending on the values of the input
// fields.
FriendlyChat.prototype.toggleButton = function () {
    if (this.messageInput.value) {
        this.submitButton.removeAttribute('disabled');
    } else {
        this.submitButton.setAttribute('disabled', 'true');
    }
};

// Checks that the Firebase SDK has been correctly setup and configured.
FriendlyChat.prototype.checkSetup = function () {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
};










//var yourVideo = document.getElementById("yourVideo");
//var friendsVideo = document.getElementById("friendsVideo");
//var yourId = Math.floor(Math.random() * 1000000000);
////Create an account on Viagenie (http://numb.viagenie.ca/), and replace {'urls': 'turn:numb.viagenie.ca','credential': 'websitebeaver','username': 'websitebeaver@email.com'} with the information from your account
//var servers = { 'iceServers': [{ 'urls': 'turn:numb.viagenie.ca', 'credential': 'tuonglaivinhhang1', 'username': 'tuonglaivinhhang1@email.com' }] };
//var pc = new RTCPeerConnection(servers);
//pc.onicecandidate = (event => event.candidate ? sendMessage(yourId, JSON.stringify({ 'ice': event.candidate })) : console.log("Sent All Ice"));
//pc.onaddstream = (event => friendsVideo.srcObject = event.stream);

//function sendMessage(senderId, data) {
//    var msg = database.push({ sender: senderId, message: data });
//    msg.remove();
//}

//function readMessage(data) {

//    var msg = JSON.parse(data.val().messages);
//    var sender = data.val().sender;
//    if (sender != yourId) {
//        if (msg.ice != undefined)
//            pc.addIceCandidate(new RTCIceCandidate(msg.ice));
//        else if (msg.sdp.type == "offer")
//            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
//                .then(() => pc.createAnswer())
//                .then(answer => pc.setLocalDescription(answer))
//                .then(() => sendMessage(yourId, JSON.stringify({ 'sdp': pc.localDescription })));
//        else if (msg.sdp.type == "answer")
//            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
//    }
//};

//database.on('child_added', readMessage);

//function showMyFace() {
//    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
//        .then(stream => yourVideo.srcObject = stream)
//        .then(stream => pc.addStream(stream));
//}

//function showFriendsFace() {
//    pc.createOffer()
//        .then(offer => pc.setLocalDescription(offer))
//        .then(() => sendMessage(yourId, JSON.stringify({ 'sdp': pc.localDescription })));
//}
