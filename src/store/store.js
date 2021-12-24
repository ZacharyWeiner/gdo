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
    selected_proposalId: ''

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

