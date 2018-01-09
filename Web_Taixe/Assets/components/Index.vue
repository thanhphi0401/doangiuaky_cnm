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
                <!--<div class="w3-cell" style="width:30%">
                    <img class="w3-circle img-responsive" src="/Assets/Image/giphy.gif" style="width:100%">
                </div>
                <div class="w3-cell w3-container">

                    <h2>Khách hàng: Nguyễn Thanh Phi</h2>
                    <p>Địa chỉ: Etown2 Quận Tân Bình, Hồ Chí Minh</p>

                    <div id="approvearea">
                        <a href="#" class="btn btn-success">Đồng ý</a>
                        <a href="#" class="btn btn-danger">Từ chối</a>
                    </div>

                    <br />
                    <br />
                    <a href="#" class="btn btn-primary">Xem bản đồ</a>
                    <br /><br />
                    <a href="#" class="btn btn-default">Bắt đầu</a>
                    <br /><br />
                    <a href="#" class="btn btn-warning">Kết thúc</a>
                </div>-->

                <!--<audio autoplay loop controls="controls" hidden>
                <source src="/Assets/Image/messenger.mp3"   type="audio/mpeg" />
                </audio>-->
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

export default {

    name: 'Index',
    mounted () {
        initialize();
        this.getEmailDriver();


    },
    data () {
        return {
            title: 'Trang chủ',
            Email:'abc@gmail.com'
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
                    console.log(response.Email);
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
        }
    }
    }
</script>

<style lang="css" scoped>
</style>