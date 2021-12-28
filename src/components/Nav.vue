<template>    
    <nav class="bg-black fixed w-full top-0 z-index-20">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-2">
        <div class="relative flex items-center justify-between h-16">
            <div class="flex items-stretch sm:justify-start">
                <div class="flex-shrink-0 ">
                    <router-link to="/">
                    <img class="block h-14 pr-2 w-auto" src="../assets/logo.png" alt="DAO">
                    </router-link>
                </div>
                <div @click='navigateToRelay()' class='flex ring-gray-300 ring-1 rounded-xl max-w-sm mx-2'>
                    <div class='pt-0.5'> 
                        <img class='h-6 w-6 rounded-full my-3 mx-2' src="https://pewparty.com/wp-content/uploads/2021/12/180.jpeg" />
                    </div>
                    <div class='text-white text-xs pt-3 px-1'>
                        <div> #1212 </div>
                        <div> <span class='bg-yellow-400 text-yellow-400 text-xs rounded-full'>.....</span> <span class='text-green-400'> 3.33 </span></div>
                    </div>
                </div>
                <div @click='navigateToRelay()' class='hidden sm:flex ring-gray-300 ring-1 rounded-xl max-w-sm mx-2'>
                    <div class='pt-0.5'> 
                        <img class='h-6 w-6 rounded-full my-3 mx-2' src="https://pewparty.com/wp-content/uploads/2021/12/834.jpeg" />
                    </div>
                    <div class='text-white text-xs pt-3 px-1'>
                        <div> #834 </div>
                        <div> <span class='bg-yellow-400 text-yellow-400 text-xs rounded-full'>.....</span> <span class='text-green-400'> 1.88 </span></div>
                    </div>
                </div>
                <div @click='navigateToRelay()' class='hidden md:flex ring-gray-300 ring-1 rounded-xl max-w-sm mx-2'>
                    <div class='pt-0.5'> 
                        <img class='h-6 w-6 rounded-full my-3 mx-2' src="https://pewparty.com/wp-content/uploads/2021/12/1765.jpeg" />
                    </div>
                    <div class='text-white text-xs pt-3 px-1'>
                        <div> #1765 </div>
                        <div> <span class='bg-yellow-400 text-yellow-400 text-xs rounded-full'>.....</span> <span class='text-green-400'> 2.62 </span></div>
                    </div>
                </div>
                <div @click='navigateToRelay()' class=' hidden lg:flex ring-gray-300 ring-1 rounded-xl max-w-sm mx-2 '>
                    <div class='pt-0.5'> 
                        <img class='h-6 w-6 rounded-full my-3 mx-2' src="https://pewparty.com/wp-content/uploads/2021/12/371.jpeg" />
                    </div>
                    <div class='text-white text-xs pt-3 px-1'>
                        <div> #371 </div>
                        <div> <span class='bg-yellow-400 text-yellow-400 text-xs rounded-full'>.....</span> <span class='text-green-400'> 4.20 </span></div>
                    </div>
                </div>
                <div @click='navigateToRelay()' class='hidden lg:flex ring-gray-300 ring-1 rounded-xl max-w-sm mx-2'>
                    <div class='pt-0.5'> 
                        <img class='h-6 w-6 rounded-full my-3 mx-2' src="https://pewparty.com/wp-content/uploads/2021/12/2238.jpeg" />
                    </div>
                    <div class='text-white text-xs pt-3 px-1'>
                        <div> #2238 </div>
                        <div> <span class='bg-yellow-400 text-yellow-400 text-xs rounded-full'>.....</span> <span class='text-green-400'> 3.11 </span></div>
                    </div>
                </div>
                <!-- <router-link to="/">Home</router-link> |
                <router-link to="/chat">Chat</router-link> |
                <router-link to="/props">Proposals</router-link> | -->
                
            </div>
            
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div v-if="isLoggingIn" class="w-auto text-white">Searching For Your GOPS ...</div>
                <div v-else class="flex items-justify-center">
                     <div  class='w-12 h-12  mr-2'> 
                    <router-link to="/send-prop">
                        <div class="w-full text-5xl font-extrabold rounded-full bg-white text-center" alt="DAO"> + </div>
                    </router-link>
                     </div>
                </div>
                <div class="ml-3 relative">
                    <div>
                        <span v-if="isLoggingIn" class='fa fa-spinner' >!</span> 
                        <button v-if="isLogin" class="rounded-full bg-white py-2 px-4" @click="signOut">
                            <img class="h-8 w-8 rounded-full float-left mr-2" :src="imageSource" alt="gopnick">
                            <span class="mt-2">{{relayx_handle}}</span>  
                        </button>
                        <button v-else class="rounded-full bg-white py-2 px-4" @click="initiateLogin()">
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
import {ref} from 'vue'
import { useRun } from '../services/wallet' 
import { mapState } from 'vuex'
import defaultGopnik from '../assets/gopnick.png'

export default {
    components: {  },
     setup() {
        const { signIn, signOut, isLogin } = useRun()
        const isLoggingIn = ref(false);
        // const userName = relayx_handle.trim('@paymail.com')
        return {  signIn, signOut, isLogin, isLoggingIn}

    },
    methods:{
        async initiateLogin(){
            this.isLoggingIn = true;
            console.log('Is Signing in from Nav');
            await this.signIn();
            console.log('Sign in from Nav complete. ');
            this.isLoggingIn = false;
        },
        navigateToRelay(){
           window.location.href = 'https://relayx.com/market/1ba1080086ca6624851e1fbff18d903047f2b75d3a9ffe5cc8bf49ed0fdb36a0_o2'
        }
    },
    computed:{
    imageSource(){
        if(!this.$store.state.user_jigs || this.$store.state.user_jigs.length === 0){return defaultGopnik}
        else {console.log(this.$store.state.user_jigs[0].props.no); return defaultGopnik}// 'https://pewparty.com/wp-content/uploads/2021/12/' + this.$store.state.user_jigs[0].no + '.jpeg';}
    },
    ...mapState(['relayx_handle', 'user_address'])
  },
}
</script> 