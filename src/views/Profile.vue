<template>
    <div class='pt-20 min-h-screen'>
        <div class='text-white'>Profile </div>
        <button @click="doStuff()" class='text-white ring-1 ring-gray-500' > Do Stuff </button>
        <jig-list></jig-list>
        <div v-if="last_offers">
        <div class='text-white' v-for="order in last_offers" :key="order.id">
            {{order}}
        </div>
        </div>
        
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import JigList from '../components/JigList.vue'
import {useFetchOrders} from './../services/RunData'
import {mapState} from 'vuex'
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
            await this.getOpenOrders(this.$store)
        }
    },
    computed:{
        ...mapState(['last_offers'])
    }
}
</script>

<style scoped>

</style>