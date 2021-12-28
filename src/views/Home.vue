<template>
 
  <div class="pt-20 m-1 rounded-xl">
    <!-- <div class="w-full rounded-xl cta flex p-2 ">
      <div class='w-3/4'>
     <h2 class="text-lg md:text-5xl font-bold text-white sm:text-3xl p-5">
        <span class=" text-black md:pt-12">Your digital passport<br> to the METAVERSE</span>
      </h2>
      <a href="https://relayx.com/market/GOP" class='m-2 p-2 text-xl  lg:px-20 lg:py-6 m-2 bg-purple-600 rounded-full text-white font-bold lg:text-2xl ' > Squat with us </a>
    </div>
    <div class='w-1/4'><img class="object-scale-down w-full pr-2" src="../assets/gopnik_cta.png" alt="gopnik"></div>
    </div> -->
    
    <img class='hidden md:inline md:object-cover md:w-full md:max-h-96 md:rounded-xl ' src="https://pewparty.com/wp-content/uploads/2021/12/GopHead2.png" />
    <img class='object-cover w-full max-h-96 rounded-xl xs:inline md:hidden' src="https://pewparty.com/wp-content/uploads/2021/12/GopHead2Thin.png" />
  </div>

  <div class="break1 mt-8"></div>
  <div class='grid xs:grid-cols-3 lg:grid-cols-4'>
    <div class='col-span-3'>
      <Proposals />
        <button 
          class="p-2 m-2 rounded-full text-xl font-bold tracking-widest " 
        :class="moreProposalsButtonClass"
          v-on:click="goToProps"   >  
        {{moreProposalsButtonText}}
      </button>
    </div>

    <div class='flex-1 col-span-4 lg:col-span-1 p-2 m-2'>
      <Messages :isTrollbox="true"/>
      
    </div>
    
  </div>
  <div class="break3 pt-10 mb-10"></div>
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
