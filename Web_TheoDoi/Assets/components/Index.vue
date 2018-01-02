<template>
    <div>

        <div class="container">


            <h1 class="text-center" style="color:forestgreen">CHI TIẾT ĐẶT XE</h1>

            <table id="infograb" border="1" class="table table-hover">
                <thead>
                    <tr>
                        <th>Khách hàng</th>
                        <th>Ngày đặt</th>
                        <th>Điểm đón</th>
                        <th>Loại xe</th>
                        <th>Phone</th>
                        <th>Trạng thái</th>
                        <th>Tài xế</th>

                        <th>Biển số</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody  id="detailgrab"></tbody>
            </table>

        </div>

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
import {calculateAndDisplayRoute} from '../scripts/main.js';

export default {

    name: 'Index',
    mounted () {
        initialize()
       
    },
    data () {
        return {
            title: 'Trang chủ'
        }
    },
    methods: {
     
    }
    }
</script>

<style lang="css" scoped>
</style>