<template>
    <div id="proposals" class="w-full xs:flex-1 md:flex mt-10 px-10 justify-center md:flex">
        
            <div class="w-auto max-w-xs mb-10 rounded-3xl overflow-hidden text-left shadow-lg bg-white border-solid border-slate-300 m-2"  v-for=" {propId, title, question, photoURL} in proposals"
            :key="propId"
            :name="propId" >
            <div class='max-w-1/3'>
            <img class="w-full object-cover h-48" :src="photoURL" alt="Proposal">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2 text-2xl">{{title}}</div>
                <p class="text-gray-700 text-base">
                    {{question.substring(0, 200)}}  ... <span class='text-blue-500 cursor-pointer' @click="setProposal(propId)"> see more </span>
                </p>
            </div>

            <div class="m-4 p-6 rounded-xl ring-2 ring-gray-300">
                
            <div class="flex">
                <span class="text-xs font-bold pr-1">{{positiveVoteDisplay(propId)}}%</span>
                <div class="bg-green-500 h-1" :class="`${voteBarWidth(propId)[0]}`"></div>
                <div class="bg-red-500 h-1" :class="`${voteBarWidth(propId)[1]}`"></div>
                <span class="text-xs font-bold pl-1">{{negativeVoteDisplay(propId)}}%</span>
            </div>
            <div class="px-8 py-10 rounded-lg flex items-center justify-center ">
                <div v-if="isLoggedIn">
                    <div v-if="!hasVote(propId)" class="flex" >
                        <div class="text text-white flex">
                            <div class="">
                                <button class=" ring-1 ring-green-500 flex rounded-full bg-gray-400 font-bold py-2 px-4 m-1 mr-3" @click="cast(propId,'Yes')">
                                    <div class=" flex items-justify-center">
                                    <img class="h-5 pr-2 " src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/thumbs-up_1f44d.png"/> 
                                    <div class="">Vote with</div>
                                    </div>
                                </button>
                            </div>
                            <div class="">
                                <button class=" ring-1 ring-red-500 flex rounded-full bg-gray-400 font-bold py-2 px-4 m-1" @click="cast(propId,'No')">
                                    <div class=" flex items-justify-center">
                                        <img class="h-5 pr-2 " src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/thumbs-down_1f44e.png"/> 
                                        <div class="">Vote against</div>
                                    </div>
                                </button> 
                            </div>
                        </div>
                    </div>
                    <div v-else id="votes" v-for=" vote in votes "
                    :key="vote.id">
                        <div v-if="vote.propId === propId">
                            <span class="rounded-full bg-gray-400 font-bold py-2 px-4 text-white"> You voted :  {{vote.vote}} </span>
                        </div>
                    </div>
                </div>
                <div v-else class='w-full text-center'>
                     <button class="w-full flex rounded-full bg-white-400 font-bold py-2 px-4 m-1 mr-3 ring-4 ring-black font-bold"> <div class='w-full text-center'>  Connect wallet to see more </div> </button>
                </div>
               
            </div>
            </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { useProposals, getVotes, getAllVotes } from './../services/firebase'
import { useStore } from 'vuex'
// import PropoposalVoteBar from './PropoposalVoteBar.vue'

export default {
    components:{},
     setup() {
        const store = useStore()
        const { proposals, sendVote } = useProposals(store.state.relayx_handle, store.state.user_address)
        const cast = (propId,vote) => {
            sendVote(propId,vote)  
        }
      

        const { votes } =  getVotes(store.state.user_address)
        const allVotes  = getAllVotes()
        console.log('proposals', proposals)
        return { proposals, cast, votes, allVotes }

    }, 
    methods:{
        hasVote(propId){
            if (this.votes.filter(v => v.propId === propId).length) {
                return true
                }
            return false   
        },
        relatedVotes(propId){
            return this.allVotes.filter((v) => v.propId === propId)
        },
        positiveVotesByProposal(propId){
            let related = this.relatedVotes(propId)
            return related.filter(v => v.vote === "Yes").length
        },
        negativeVotesByProposal(propId){
            let related = this.relatedVotes(propId)
            return related.filter(v => v.vote === "No").length
        },
        voteBarWidth(propId){
            let _up = this.positiveVotesByProposal(propId)
            let _down = this.negativeVotesByProposal(propId)
            let _relatedTotal = this.relatedVotes(propId).length;
            console.log(_up, _down, _relatedTotal)
            if((_up === 0 && _down === 0) || _relatedTotal === 0){
                return ['w-1/2', 'w-1/2']
            }
            if(_up === 0 || _relatedTotal === 0){
                return ['w-0/2', 'w-2/2']
            }
            let intPercentage = parseInt((_relatedTotal / _up ) * 100)
            console.log(intPercentage)
            if(intPercentage < 20){
                return ['w-1/5','w-4/5']
            }
            else if(intPercentage < 40){
                return ['w-2/5','w-3/5']
            }else if(intPercentage < 55 ){
                return ['w-1/2','w-1/2']
            }
            else if(intPercentage < 80 ){
                return ['w-3/4','w-1/4']
            }
            else if(intPercentage < 90 ){
                return ['w-4/5','w-1/5']
            }
            else{
                return ['w-full','']
            }
            
        },
        setProposal(propId) {
            this.$store.commit('setSelectedProposalId', propId)
            this.$router.push('/prop-detail')
        },
        positiveVoteDisplay(propId){
            if (propId === undefined) return "0";
            if(this.positiveVotesByProposal(propId) === 0){
                return "0.00"
            } else{ 
                 return ( ( this.positiveVotesByProposal(propId) / this.relatedVotes(propId).length) * 100).toString().substring(0,4)
            }
        },
        negativeVoteDisplay(propId){
            if (propId === undefined) return "0";
            if(this.negativeVotesByProposal(propId) === 0){
                return "0.00"
            } else{ 
                 return ( ( this.negativeVotesByProposal(propId) / this.relatedVotes(propId).length) * 100).toString().substring(0,4)
            }
        }
       
    },
    computed: {
        isLoggedIn(){
            if(this.$store.state.user_address !== ""){return true}
            return false;
        }
        
    }
}
</script>