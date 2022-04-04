import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store  ({
  state:{
    hubs:[],
    devices:[],
    users:[],
    rooms:[],
    user:{}
  },
  mutations:{
    UPDATE_ADD_ROOM(state, data) {
      state.user.room = data.id
      state.rooms.push(data)
    },
    GET_APPDATA(state, {hubs = [], devices = [], rooms = [], users = [], user = []}) {
      state.hubs = hubs
      state.devices = devices
      state.rooms = rooms
      state.users = users
      state.user = user[0]
      if (user[0].userPreference.lSP == 0) state.user.userPreference.lSP = false
      if (user[0].userPreference.lSP == 1) state.user.userPreference.lSP = true
      if (user[0].userPreference.fSP == 0) state.user.userPreference.fSP = false
      if (user[0].userPreference.fSP == 1) state.user.userPreference.fSP = true
    },
    INCREASE_TEMP(state) {
      if (state.user.userPreference && state.user.userPreference.tP) {
        state.user.userPreference.tP++;
      }
    },
    DECREASE_TEMP(state) {
      if (state.user.userPreference && state.user.userPreference.tP) {
        state.user.userPreference.tP--;
      }
    },
    UPDATE_PREFERENCE(state, data) {
      if (state.user.userPreference) {
        state.user.userPreference = data
      }
    },
    UPDATE_ADD_HUB(state, data) {
      state.user.hub = data.id
      state.hubs.push(data)
    }
  },
  actions:{
    
  },
  getters:{

  }
})