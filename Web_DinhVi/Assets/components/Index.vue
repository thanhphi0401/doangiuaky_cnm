<template>
    <div id="map">
    <div id="floating-panel">
        <input id="address" type="text" value="512 cách mạng tháng 8">
        <input type="button" value="Encode" onclick="codeAddress($('#address').val())">
        <br>

        <select onchange="codeAddress($('#selection option:selected').text())" class="form-control" id="selection">
            <option value="0" selected>=====Danh sách cần định vị=====</option>

        </select>
        <input type="button" class="btn btn-danger" value="ĐỊNH VỊ" onclick="locatesleep($('#selection').val())">
    </div>
    <div class="container" id="areauser">
        <p>Welcome</p>
        <button type="button" v-on:click="logout" class="btn btn-primary">Logout</button>
    </div>
    </div>
</template>
<script type="text/javascript"> 
    
    import { initialize} from '../scripts/main.js'
    export default {
        name: 'Index',

        mounted: function () {
            initialize()
        },
        data () {
            return {
                title: 'Trang chủ',
            }
        },
        methods: {
            logout: function() {
                if (localStorage.access_token != '')
                    localStorage.access_token = '';
                this.$router.go(-1);
            }
        }
    }
</script>
<style lang="css" scoped>
</style>