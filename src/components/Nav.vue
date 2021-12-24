<template>    
    <nav class="bg-black fixed w-full top-0 z-index-20">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-2">
        <div class="relative flex items-center justify-between h-16">
            <div class="flex-1 items-stretch sm:justify-start">
                <div class="flex-shrink-0 ">
                    <router-link to="/"><img class="block h-16 w-auto" src="../assets/logo.png" alt="DAO"></router-link>
                </div>
                <!-- <router-link to="/">Home</router-link> |
                <router-link to="/chat">Chat</router-link> |
                <router-link to="/props">Proposals</router-link> | -->
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div class="ml-3 relative">
                    <div>
                        <button v-if="isLogin" class="rounded-full bg-white py-2 px-4" @click="signOut">
                            <img class="h-8 w-8 rounded-full float-left mr-2" src="../assets/gopnick.png" alt="gopnick">
                            <span class="mt-2">{{relayx_handle}}</span>  
                        </button>
                        <button v-else class="rounded-full bg-white py-2 px-4" @click="signIn">
                            <img class="h-8 float-left mr-3" src="../assets/wallet_icon.png" alt="DAO">
                            <span class="pt-2">Connect wallet</span> 
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    </nav>    
    <router-view/> 
</template>


<script>
import { useRun } from '../services/wallet' 
import { mapState } from 'vuex'

export default {
    components: {  },
     setup() {
        const { signIn, signOut, isLogin } = useRun()
    
        // const userName = relayx_handle.trim('@paymail.com')
        return {  signIn, signOut, isLogin }

    },
    computed:{
    ...mapState(['relayx_handle', 'user_address'])
  },
}
</script> 