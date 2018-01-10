<template>
    <div class="mobileinterface">

        <nav class="w3-sidebar w3-bar-block w3-card" id="mySidebar">
            <div class="w3-container w3-theme-d2">
                <span onclick="closeSidebar()" class="w3-button w3-display-topright w3-large">X</span>
                <br>
                <div class="w3-padding w3-center">
                    <img class="w3-circle" src="/Assets/Image/driver_avatar.png" alt="avatar" style="width:75%">
                </div>
            </div>
            <a class="w3-bar-item w3-button" href="#">{{Email}}</a>
            <a class="w3-bar-item w3-button" v-on:click="logout" href="#">Logout</a>
        </nav>

        <header class="w3-top w3-bar w3-theme">
            <button class="w3-bar-item w3-button w3-xxxlarge w3-hover-theme" onclick="openSidebar()">&#9776;</button>
            <h1 class="w3-bar-item">DriverApp</h1>
        </header>

        <div class="w3-container" style="margin-top:90px">
            <hr>
            <div class="w3-cell-row" id="notify">
                <div id="infocustomer" class="hidden">
                    <div class="w3-cell" style="width:30%">
                        <img class="w3-circle img-responsive" src="/Assets/Image/giphy.gif" style="width:100%">
                    </div>
                    <div class="w3-cell w3-container">
                        <h2>Khách hàng: {{customerName}}</h2>
                        <p>Địa chỉ: {{customerAddress}}</p>

                        <div id="approvearea">
                            <a href="#" v-on:click="approveGrab" class="btn btn-success">Đồng ý</a>
                            <a href="#" class="btn btn-danger">Từ chối</a>
                        </div>


                        <audio id="audiomessage" muted autoplay loop controls="controls" hidden>
                            <source src="/Assets/Image/messenger.mp3" type="audio/mpeg" />
                        </audio>
                        <br />
                        <br />
                        <div id="actionarea" class="hidden">
                            <a href="#" v-on:click="showmap" class="btn btn-primary">Xem bản đồ</a>
                            <br /><br />
                            <a href="#" v-on:click="start" class="btn btn-default">Bắt đầu</a>
                            <br /><br />
                            <a href="#" v-on:click="finish" class="btn btn-warning">Kết thúc</a>
                        </div>

                    </div>

                </div>
            </div>
            <hr>


        </div>

        <footer class="w3-container w3-bottom w3-theme w3-margin-top">
            <h3>Ứng dụng grabike dành cho tài xế. Phát triển bởi Nguyễn Thanh Phi. &copy; 2018</h3>
        </footer>




        <!-- Modal -->
        <div id="mymap" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Định tuyến xe đi</h4>
                    </div>
                    <div class="modal-body" id="map">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>

    //import * as mainjs from '../scripts/main.js';
import {initialize} from '../scripts/main.js';
import {getCurrentCustomer} from '../scripts/main.js';
import {calculateAndDisplayRoute} from'../scripts/showdirection.js'
    //import * as a from '../scripts/main.js';
import Notify from './Notify.vue';
import Firebase from 'firebase';


    let config = {
        apiKey: "AIzaSyBPRUwT-TI81VkXmC_MReaj8msT-8NTxEY",
        authDomain: "doangiuakiapp1.firebaseapp.com",
        databaseURL: "https://doangiuakiapp1.firebaseio.com",
        projectId: "doangiuakiapp1",
        storageBucket: "doangiuakiapp1.appspot.com",
        messagingSenderId: "208748898412"
    };


    let app = Firebase.initializeApp(config);
    let db = app.database();
    let grabRef = db.ref('grabinfo');
    let motoRef = db.ref('motorbike');
    let EmailDriver;
    let grabinfo=new Array();

export default {

    name: 'Index',
    mounted () {
        initialize();
        this.getEmailDriver();

        this.realtime();
        this.grabrealtime();


    },
    firebase: {
            grabs: grabRef,
            motos : motoRef
    },
    data () {
        return {
            title: 'Trang chủ',
            Email:'abc@gmail.com',
            currentMotoDriver:"",
            customerName:"",
            customerAddress:"",
            driverAddress:"",
            currentGrabKey:""
        }
    },
    methods: {
        getEmailDriver()
        {
            var self=this;
            $.ajax({
                url: '/Home/getCurrentDriver',
                type: "GET",
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    self.Email=response.Email;
                    EmailDriver=response.Email;

                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        logout()
        {
            var self=this;
            self.$router.push('/login');
            window.localStorage.removeItem("access_token");
        },
        approveGrabAndSend()
        {
            console.log("pass");
        },
        realtime()
        {
            Firebase.messagesRef =db.ref('motorbike');

            Firebase.messagesRef.off();
            var self=this;

            var setMessage = function (data) {
                var val = data.val();

                if(val.email==self.Email)
                {
                    self.currentMotoDriver = [data.key, val.biensoxe, val.chuxe, val.diachi, val.kinhdo, val.vido,val.email];
                    console.log(self.currentMotoDriver);
                    self.driverAddress=val.diachi;


                }

            }.bind(this);


            Firebase.messagesRef.on('child_added', setMessage);
            Firebase.messagesRef.on('child_changed', setMessage);

        },
        grabrealtime()
        {
            Firebase.messagesRef = db.ref('grabinfo');
            Firebase.messagesRef.off();
            var self=this;

            var setGrabCurrent = function (data) {
                var val = data.val();

                /////////////////////


                /////////////////////

                var data = [data.key, val.customer, val.date, val.motorbike, val.status];
                if(val.motorbike==self.currentMotoDriver[0] && (data[4]=="1" || data[4]=="2"))//nếu là chuyến grab cho thằng driver hiện tại thì push thông báo
                {
                    self.currentGrabKey=data[0];
                    grabinfo.push(data);

                    var currentcustomer=getCurrentCustomer(val.customer);
                    //setTimeout(function(){ alert("Hello"); }, 3000);
                    //lấy thông tin khách hàng
                    self.customerName=currentcustomer[1];
                    self.customerAddress=currentcustomer[5];
                    //debugger
                  

                    
                        $('#infocustomer').removeClass('hidden');
                        $("#audiomessage").prop("muted",!$("#audiomessage").prop("muted"));

                    

                    //nếu sau 5 giây không có

                    //$('#infocustomer').addClass('hidden');
                    //$("#audiomessage").prop("muted",!$("#audiomessage").prop("muted"));

                    //tự set trng thái grab đã hoàn thành (stauts =3) =>Nâng cấp

                }
            }.bind(this);


            Firebase.messagesRef.on('child_added', setGrabCurrent);
            Firebase.messagesRef.on('child_changed', setGrabCurrent);

        },
        approveGrab()
        {

            $('#approvearea').addClass('hidden');

            $("#audiomessage").prop("muted",!$("#audiomessage").prop("muted"));
            $('#actionarea').removeClass('hidden');



            

        },
        showmap()
        {
            var self=this;

            calculateAndDisplayRoute(self.driverAddress,self.customerAddress);
        },
        start()
        {
            //thay đổi trạng thái tài xế về 2
            let self=this;
            let driverRef = db.ref('motorbike');
            let postData;
            let key;
            //lay ref child can thay doi
            driverRef.on("child_added", retVal => {
                let getEmail = retVal.val().email;

                if (self.Email == getEmail) {
                    //create post entity
                    key=retVal.key;

                    postData = {
                        biensoxe: retVal.val().biensoxe,
                        chuxe: retVal.val().chuxe,
                        diachi: retVal.val().diachi,
                        email: retVal.val().email,
                        kinhdo: retVal.val().kinhdo,
                        loaixe: retVal.val().loaixe,
                        vido: retVal.val().vido,
                        status: "2"
                    };
                }
            });

            try {
                //tien hanh update customer (status =1 đã đc định vị)
                var childRef = driverRef.child(key);
                childRef.update(postData);

            }
            catch (err) {
                console.log(err);
            }

            //thay đổi status=2 cho granibfo

        },
        finish()
        {
            //thay đổi trạng thái tài xế về 1
            let self=this;
            let driverRef = db.ref('motorbike');
            let postData;
            let key;
            //lay ref child can thay doi
            driverRef.on("child_added", retVal => {
                let getEmail = retVal.val().email;

                if (self.Email == getEmail) {
                    //create post entity
                    key=retVal.key;

                    postData = {
                        biensoxe: retVal.val().biensoxe,
                        chuxe: retVal.val().chuxe,
                        diachi: retVal.val().diachi,
                        email: retVal.val().email,
                        kinhdo: retVal.val().kinhdo,
                        loaixe: retVal.val().loaixe,
                        vido: retVal.val().vido,
                        status: "1"
                    };
                }
            });

            try {
                //tien hanh update customer (status =1 đã đc định vị)
                var childRef = driverRef.child(key);
                childRef.update(postData);

            }
            catch (err) {
                console.log(err);
            }


            //thay đổi status=3 cho granibfo
            let grabRef = db.ref('grabinfo');
            let postData1;
            let key1;
            //lay ref child can thay doi
            grabRef.on("child_added", retVal => {

                if (retVal.key == self.currentGrabKey) {
                    //create post entity
                    key1=retVal.key;

                    postData1 = {
                        motorbike:retVal.val().motorbike,
                        customer:retVal.val().customer,
                        date:retVal.val().date,
                        status: "3"
                    };
                }
            });

            try {
                //tien hanh update customer (status =1 đã đc định vị)
                var childRef = grabRef.child(key1);
                childRef.update(postData1);

            }
            catch (err) {
                console.log(err);
            }


            //ẩn thông tin
            $('#infocustomer').addClass('hidden');
            $('#map').addClass('hidden');

        }
    },
    components: {
        Notify
    }
    }





</script>

<style lang="css" scoped>
</style>