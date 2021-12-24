<template>
    <div class="w-full my-2">
        <img src="" alt="">
        <span class="ml-12 text-xs gray-500" v-if="!sender">{{ name }}</span>
        <div class="flex" :class="sender ? 'flex-row-reverse' : '' ">
            <div id="Message-container" class="text w-3/4 mx-2 m-1 rounded-full rounded-tl-none text-white" :class="sender ? 'bg-green-800' : 'bg-gray-700' ">
                <slot/> 
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components:{  },
    props: {
        name: { type: String, default: '' },
        sender: { type:Boolean, default: false },
    }
}
</script>