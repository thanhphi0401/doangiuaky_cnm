<template>
    <a href="#" id="approve" v-on:click="approveGrab" class="btn btn-success approve">Đồng ý</a>
</template>

<script type="text/javascript">

export default {

    name: 'Notify',

    data () {
        return {
            title: 'Notify'
        }
    },

    methods: {
            approveGrab() {
                console.log("ok");
                this.$emit('approveGrab')
            }
    }
    }
</script>

<style lang="css" scoped>
</style>