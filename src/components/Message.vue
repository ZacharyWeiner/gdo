<template>
    <div class="">
        <img src="" alt="">
        <span class="ml-12 text-xs gray-500" v-if="!sender">{{ name }}</span>
        <div class="flex" :class="sender ? 'flex-row-reverse' : '' ">
            <div class="p-1 m-1">
                <avatar :src="imageSource(gopnikId)" />
            </div>
            <div id="Message-container" class="text-left p-2  mx-2 m-1 rounded-full  text-white" :class="sender ? 'bg-purple-500 rounded-tr-none' : 'rounded-tl-none bg-teal-400' ">
                <slot/> 
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from './Avatar.vue'
import defaultGopnik from '../assets/gopnick.png'

export default {
    components:{ Avatar },
    props: {
        name: { type: String, default: '' },
        sender: { type:Boolean, default: false },
        gopnikId: { type:Number, default: 0 },
    },
    methods:{
        imageSource(gopnikId){
            if(!gopnikId){return defaultGopnik}
            else {console.log(this.$store.state.user_jigs[0].no); return 'https://pewparty.com/wp-content/uploads/2021/12/' + gopnikId.toString() + '.jpeg';}
        },
    }
}
</script>