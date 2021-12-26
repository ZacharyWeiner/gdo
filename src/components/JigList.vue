<template>
    <div v-if="store.state.user_jigs[0] !== undefined" class='p-2 m-2 max-w-xl mx-auto'> 
        <div  v-for="jig in store.state.user_jigs" :key="jig.id" 
                class='p-2 m-2 ring-white ring-2 rounded-xl flex' 
                :class="`${store.state.gopnikId === jig.no ?  'ring-teal-300' : ''}`"
                @click="setGopnikId(jig.no)">
            <div class="text-white "> 
                <img class='h-10 w-10 rounded-full' :src="`${'https://pewparty.com/wp-content/uploads/2021/12/' + jig.no + '.jpeg'}`" />
            </div>
            <div class="text-white text-center p-2 "> 
                Gopniks Number: {{jig.no}}
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex' 
export default {
     setup () {
        let store = useStore()
        let jig =  store.state.user_jigs[0]
        console.log(jig)
        const state = reactive({
            count: 0

        })
    
        return {
            store,
            ...toRefs(state),
        }
    },
    methods:{
        setGopnikId(id){
            this.$store.commit("setGopnikId", id);
        }
    }
    
}
</script>