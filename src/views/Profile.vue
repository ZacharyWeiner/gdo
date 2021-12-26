<template>
    <div class='pt-20'>
        <div class='text-white'>Profile </div>
        <jig-list></jig-list>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import JigList from '../components/JigList.vue'

export default {
  components: { JigList },
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style scoped>

</style>