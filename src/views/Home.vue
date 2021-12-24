<template>
 
  <div class="pt-20 m-1">
    <div class="w-full rounded-xl cta flex">
      <div class='w-3/4'>
     <h2 class="text-lg md:text-5xl font-bold text-white sm:text-3xl p-5">
        <span class="block text-black md:pt-12">Your digital passport<br> to the METAVERSE</span>
      </h2>
      <a href="https://relayx.com/market/GOP" class='px-20 py-6 m-2 bg-purple-600 rounded-full text-white font-bold text-2xl ' > Squat with us </a>
    </div>
    <div class='w-1/4'><img class="object-scale-down w-full pr-2" src="../assets/gopnik_cta.png" alt="gopnik"></div>
    </div>
    
  </div>

  <div class="break1 mt-2"></div>
    <Proposals />
    <div class="pb-10 w-full">
      <button 
         class="rounded-full px-10 py-4 text-xl font-bold tracking-widest " 
        :class="moreProposalsButtonClass"
         v-on:click="goToProps"   >  
        {{moreProposalsButtonText}}
      </button>
    </div>
  <div class="break2"></div>
  <div class='flex items-justify-center'>
    <Messages />
  </div>
  <div class="break3"></div>

</template>


<script>
import Proposals from '@/components/Proposals.vue'
import Messages from '@/components/Messages.vue'
import { useRun } from '../services/wallet' 
import {useStore} from 'vuex'

export default {
  setup() {
    const { isLogin } = useRun()
    let store = useStore()
    store.commit('setSelectedProposalId', null);
    return { isLogin, store }
  },
  name: 'Home',
  components: { Proposals, Messages  },
  computed: {
    moreProposalsButtonClass() {
      if (this.isLogin) {
        return  'bg-purple-800 text-white '
      }
      return 'bg-gray-400 text-gray-700'
    },
    moreProposalsButtonText() {
      if (this.isLogin) {

        return 'See more proposals'
      }
      return 'Connect to see more'

    }
  },
  methods: {
    goToProps() {
      this.$router.push('/props')
    }
  }
}
</script>

<style>

.break1 {
  height: 60px;
  background: url('../assets/break.png') center top no-repeat ;
  background-size: cover;

}

.break2 {
  height: 60px;
  background: url('../assets/break2.png') center top no-repeat ;
  background-size: cover;

}

.break3 {
  height: 60px;
  background: url('../assets/break3.png') center top no-repeat ;
  background-size: cover;

}

.cta {
  background-color: #3AFFFD;
}

</style>
