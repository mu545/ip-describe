import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: {
      map: {
        zoom: 10
      },
      myip: null
    },
    info: {
      ip: 'ip address',
      is_eu: false,
      city: 'city',
      region: 'region',
      region_code: 'region code',
      country_name: 'country name',
      country_code: 'country code',
      continent_name: 'continent name',
      continent_code: 'continent code',
      latitude: 0,
      longitude: 0,
      asn: {
        asn: 'asn',
        name: 'name',
        domain: 'domain',
        route: 'route',
        type: 'type'
      },
      organisation: 'organisation',
      postal: null,
      calling_code: 'calling code',
      flag: 'https://ipdata.co/flags/id.png',
      emoji_flag: '\ud83c\uddee\ud83c\udde9',
      emoji_unicode: 'U+1F1EE U+1F1E9',
      carrier: {
        name: 'name',
        mcc: 'mcc',
        mnc: 'mnc'
      },
      languages: [
        {
          name: 'name',
          native: 'native'
        }
      ],
      currency: {
        name: 'name',
        code: 'code',
        symbol: 'symbol',
        native: 'native',
        plural: 'plural'
      },
      time_zone: {
        name: 'name',
        abbr: 'abbr',
        offset: 'offset',
        is_dst: false,
        current_time: 'current time'
      },
      threat: {
        is_tor: false,
        is_proxy: false,
        is_anonymous: false,
        is_known_attacker: false,
        is_known_abuser: false,
        is_threat: false,
        is_bogon: false
      },
      count: 'count'
    },
    input: {
      ip: null,
      lookup: null
    },
    messages: []
  },
  mutations: {
    newMessage (state, message) {
      state.messages.push(message)
    },
    clearMessages (state) {
      state.messages = []
    }
  },
  actions: {

  }
})
