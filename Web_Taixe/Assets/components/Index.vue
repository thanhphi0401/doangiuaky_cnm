<template>
    <div>

        <div class="container">


          

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