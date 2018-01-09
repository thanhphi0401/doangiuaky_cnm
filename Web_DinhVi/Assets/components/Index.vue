<style>

    #floating-panel {
        position: absolute;
        top: 10px;
        left: 20%;
        z-index: 5;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #999;
        text-align: center;
        font-family: 'Roboto','sans-serif';
        line-height: 30px;
        padding-left: 10px;
        width: 20%;
    }

    #areauser {
        position: absolute;
        top: 500px;
        left: 77%;
        z-index: 5;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #999;
        text-align: center;
        font-family: 'Roboto','sans-serif';
        line-height: 30px;
        padding-left: 10px;
        width: 16%;
    }

    #selection {
        margin-top: 5px;
        margin-bottom: 5px;
    }
</style>

<template>
    <div class="container-fluid">
        <div id="floating-panel">

            <select v-on:change="changePoint"  class="form-control" id="selection">
                <option value="0" selected>=====Danh sách cần định vị=====</option>
            </select>
            <input type="button" v-on:click="dinhvi" class="btn btn-danger" value="ĐỊNH VỊ">

        </div>
        <div class="container" id="areauser">

            <p>Welcome, {{Email}}</p>
            <a href="#" v-on:click="logout" class="btn btn-primary">Logout</a>
        </div>

    </div>
</template>



<script type="text/javascript"> 
    
    import {initialize} from '../scripts/main.js'
    import {codeAddress} from '../scripts/main.js'
     import {locatesleep} from '../scripts/main.js'
    export default {
        name: 'Index',

        mounted: function () {
            initialize();
            this.getEmailLocator();

        },
        data () {
            return {
                title: 'Trang chủ',
                Email:'abc@gmail.com'
            }
        },
    methods: {
        getEmailLocator()
        {
            var self=this;
            $.ajax({
                url: '/Home/getCurrenLocator',
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
            },
        changePoint()
        {
            codeAddress($('#selection option:selected').text());
        },
        dinhvi()
        {
            locatesleep($('#selection').val());
        }
        }
    }
</script>
<style lang="css" scoped>
</style>