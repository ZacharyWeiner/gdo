<template>
  <div id="ProposalDetail " class="max-w-4xl mx-auto xs:flex-1 mt-10 px-10 justify-center mt-40">
    <div>
      <div v-on:click="goBack()" class="text-left mb-10"> 
        <button class="font-bold px-6 py-3 border-4 border-white text-white rounded-lg"> Back</button>
      </div>
      <div class="">
        <div class="text-2xl font-bold tracking-2xl text-white mb-5">{{selectedProposal.title}}</div>
        <img class="w-full object-cover max-h-96 rounded-2xl " :src="selectedProposal.photoURL" alt="Proposal">
      </div>
      
      <div class="flex justify-center text-white mt-4">
        <span class="w-1/2">Posted Date: {{postedDate}} </span>
        <span class="w-1/2">Voting {{selectedProposal.endsOn}}</span>
      </div>

      <div class="rounded-3xl bg-gray-100 p-6 mt-20 ">
        <div class="text-black">
          {{selectedProposalQuestionText}}
        </div>
        <div class="text-left mt-6 ">
          <div class="font-bold mb-2">Proposed by</div>
          <div class="flex mb-8">
            <img class="block h-16 w-auto rounded-full mr-2" src="../assets/gopnick.png" alt="DAO">
              <div class="block">
                <div class="author">{{selectedProposal.proposedBy ? selectedProposal.proposedBy[0] : ""}}</div>
                <div class="font-bold">#{{selectedProposal.proposedBy ? selectedProposal.proposedBy[1] : ""}}</div>
              </div>
          </div>
          <div class="flex items-justify justify-between">
            <div>Requesting</div>
            <div>Wallet Address</div>
          </div>
          <div class="flex ring-1 ring-gray-300 flex rounded-full items-justify justify-between font-bold py-2 px-4 m-1">
                <div>${{selectedProposal.requestedAmount}}</div>
                <div>{{selectedProposal.payoutAddress}}</div>
          </div>
        </div>
      </div>
      <div class="propchat pt-6 pb-6">
            <Messages />
      </div>
      <div class="break2"></div>
      <div class="w-full">
        <Messages :isTrollbox="true" />
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { useProposals, getVotes, getAllVotes } from './../services/firebase'
import { useStore } from 'vuex'
import { useRun } from './../services/wallet'
import Messages from '@/components/Messages.vue'

export default {
  name: 'Proposal-Detail',
  components: {
    Messages
  },
  setup() {
    const store = useStore()
    const {canAccess} = useRun();
    const { proposals, sendVote } = useProposals(store.state.relayx_handle, store.state.user_address)
    const cast = (propId,vote) => {
        sendVote(propId,vote)  
    }

    console.log(proposals)
  

    const { votes } =  getVotes(store.state.user_address)
    const allVotes  = getAllVotes()
  
    return { proposals, cast, votes, allVotes, canAccess }  


  },
  methods:{
    goBack(){
      this.$router.push('/');
    }
  },
  computed: {
    ...mapState(['selected_proposalId']),
    postedDate(){
      try{
         let date = new Date(this.selectedProposal.createdOn.seconds * 1000);
         return date.toDateString()
      }catch(err){
        console.log(err)
      }
      return '';
      
    },
    selectedProposal() {
      if(this.proposals.length === 0){
        return {propsal: {title: '', photoURL: '', proposedBy: ['', ''], createdOn: '',endsOn: '', question: '' }}
      }
      let sp = this.proposals.filter(p => p.propId === this.$store.state.selected_proposalId)[0]
      console.log(sp)
      return sp;
    },
    selectedProposalQuestionText(){
      if(!this.canAccess){
        return "Connect wallet to see the proposal details..." 
      }
      return this.selectedProposal.question;
    }
    
    
  }
  
}
</script>