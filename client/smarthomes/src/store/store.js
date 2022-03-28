import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store  ({
  state:{
    hubs:[],
    devices:[],
    members:[],
    rooms:[],
  },
  mutations:{
    GET_APPDATA(state, {hubs = [], devices = [], rooms = [], members = []}) {
      state.hubs = hubs
      state.devices = devices
      state.rooms = rooms
      state.members = members
    },
  },
  actions:{
    
  },
  getters:{

  }
})