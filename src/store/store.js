import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'


const vuexLocal = new VuexPersistence({
  key: 'NFTS',
  storage: window.localStorage
})

export default createStore({
  state: {
    // save variables
    relayx_handle: '',
    user_address: '',
    user_jigs: [],
    selected_proposalId: '',
    gopnikId: '', 
    last_offers: [],
    last_offers_last_checked: ''

  },
  mutations: {
    // change state
    setRelayxHandle(state, _handle) {
      state.relayx_handle = _handle
    },
    setUserAddress(state, _userAddress) {
      state.user_address = _userAddress
    },
    setUserJigs(state, _userJigs) {
      state.user_jigs = _userJigs
    },
    setSelectedProposalId(state, _propId) {
      state.selected_proposalId = _propId
    },
    setGopnikId(state, id){
      state.gopnikId = id;
    },
    setLastOffers(state, offers){
      state.last_offers = offers
    },
    setLastOffersLastChecked(state, time){
      state.last_offers_last_checked = time;
    }
  },
  actions: {
    // call multiple mutation routines
    login({commit}, {_handle, _userAddress}) {
      commit('setRelayxHandle', _handle)
      commit('setUserAddress', _userAddress)
    },
    logout({commit}) {
      commit('setRelayxHandle', '')
      commit('setUserAddress', '')
    }

    
  },
  plugins: [vuexLocal.plugin],
  getters: {
    
  },
})

