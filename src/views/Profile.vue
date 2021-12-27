<template>
    <div class='pt-20 min-h-screen'>
        <div class='text-white'>Profile </div>
        <!-- <button @click="doStuff" class='text-white ring-1 ring-gray-500' > Do Stuff </button> -->
        <jig-list></jig-list>
        <div class='h-full'></div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import JigList from '../components/JigList.vue'
import {useFetchOrders} from './../services/RunData'
export default {
  components: { JigList },
    setup () {
        const {getOpenOrders} = useFetchOrders();
        const state = reactive({
            count: 0,
        })
    
        return {
            getOpenOrders,
            ...toRefs(state),
        }
    },
    methods:{
        async doStuff(){
            let response = await this.getOpenOrders()
            console.log(response)
        }
    }
}
</script>

<style scoped>

</style>