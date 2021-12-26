<template>
    <div class=" w-full min-w-xl mx-auto">
        <div class="w-full justify-center">
            <div class="flex items-center justify-center mb-5">
                <img class="h-5 pr-2" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/loudly-crying-face_1f62d.png">
                <div class="font-bold text-2xl text-white uppercase tracking-2xl">{{getChatTitle}}</div>
            </div>
           <div class="h-full justify-end rounded-xl ring-2 ring-gray-300 ">
               <div class="overflow-y-scroll justify-end max-h-96 p-2 m-2">
                   <Message
                    v-for="{ id, text, userName, userId, gopnikId } in filteredMessages"
                    class=''
                    :key="id"
                    :name="userName"
                    :sender='userId === currentUserID'
                    :gopnikId="gopnikId"
                >
                    <Markdown 
                    :source="text"
                    :linkify="true"
                    :html="true"
                    :break="true"  />
                </Message>
               </div>
                
                <div class="w-full bg-white rounded-b-lg  ">
                    <form  @submit.prevent="send(getChatCode)" class="w-full text-lg flex ">
                        <input class='w-full rounded-2xl' rows="2" v-model="message" :placeholder="[[chatPlaceholder]]" :disabled="!canAccess"  required>
                        <button type="submit" >
                            <SendIcon></SendIcon>
                        </button>
                    </form>
                </div>         
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue'
import { useChat } from './../services/firebase'
import { useRun } from '../services/wallet' 
import { useStore } from 'vuex'

import SendIcon from './SendIcon.vue'
import Message from './Message.vue'
import Markdown from 'vue3-markdown-it'


export default {
    components:{ Message, SendIcon, Markdown}, 
    setup() {
        const store = useStore()
        // console.log("is Trollbox", this.isTrollbox)
        const { messages, sendMessage } = useChat(store.state.relayx_handle, store.state.user_address)
        const { canAccess } = useRun()
        const currentUserID = store.state.user_address
        const bottom = ref(null)
        watch(
            messages,
            () => {
                nextTick(() => {
                    bottom.value?.scrollIntoView({ behavior: 'smooth' })
                })
            },
            {deep: true}
        )

        const message = ref('')
        const send = (propCode) => {
            if(store.state.relayx_handle !== ""){
                sendMessage(message.value, propCode, store.state.gopnikId)
                message.value = ''
                bottom.value?.scrollIntoView({ behavior: 'smooth' })
            } else{
                alert('you are not logged in')
            }
            
        }
        
        return { messages, bottom, message, send, currentUserID, canAccess}

    },
    methods:{
        
    },
    computed: {
        chatPlaceholder() {
            if (this.isLoggedIn) {
                return 'Type to chad'
            } 
            else {
                return 'Buy Gopnik to chad'
            }
        },
        isLoggedIn(){
            return this.$store.state.relayx_handle !== "";
        },
        chatEnabled(){
            return this.isLoggedIn ? true : false
        },
        filteredMessages (){
            console.log(this.$store.state.selected_proposalId)
            if(this.$store.state.selected_proposalId > 0 && this.isTrollbox !== true) return this.messages.filter( m => m.propId &&  m.propId === this.$store.state.selected_proposalId)
            else return this.messages.filter(m => (!m.propId || m.propId < 1 || m.propId == 'Public'))
        },
        getChatCode() {
            if (this.isTrollbox) return 'Public'
            else return this.$store.state.selected_proposalId
        },
        getChatTitle() {
            if (this.isTrollbox) return 'Trollbox'
            else return 'Proposal Discussion'
        },
    },
    props: ['isTrollbox']
}
</script>
