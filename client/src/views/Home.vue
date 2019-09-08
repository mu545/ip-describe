<template>
  <div class="columns is-mobile is-multiline is-marginless">
    <div class="column is-12">
      <div class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title has-text-light">IP Location</h1>
            <h2 class="subtitle has-text-grey-lighter">getting information from an ip address</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-12">
      <div class="columns is-mobile is-centered is-vcentered" id="input-area">
        <div class="column is-12-mobile is-three-quarters-tablet is-two-fifths-desktop">
          <b-field>
            <b-input
              icon="binoculars"
              type="search"
              placeholder="enter ip address"
              expanded
              v-model="input.ip"
              :disabled="input.lookup == true"
              :loading="input.lookup == true"
            ></b-input>
            <button
              class="button"
              :disabled="input.lookup == true"
              @click="lookup"
            >
              LOOK
            </button>
          </b-field>
          <div class="message">
            <p class="message-body has-text-centered">
              <i class="fas fa-street-view"></i>
              Your Ip Address is
              <a
                class="has-text-grey"
                v-if="config.myip != null"
                @click="myip"
              >
                {{ config.myip.ip }}
              </a>
              <a v-else>
                {{ config.myip == null ? 'none' : 'waiting' }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-12" v-if="messages.length > 0">
      <div class="columns is-mobile is-multiline is-centered is-vcentered" id="notification">
        <div class="column is-12-mobile is-three-quarters-tablet is-two-fifths-desktop">
          <div
            class="message"
            v-for="(message, key) of messages"
            :key="key"
            :class="message.type"
          >
            <div class="message-body">
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-12">
      <div class="columns is-mobile is-centered" id="detail-info">
        <div class="column is-12-mobile is-three-quarters-tablet">
          <div class="columns is-multiline">
            <div class="column is-12-mobile is-12-tablet is-6-desktop">
              <div class="columns is-multiline">
                <div class="column is-12">
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-header-title">General Information</h3>
                    </div>
                    <div class="card-content" id="detail-info-general">
                      <table class="table is-fullwidth is-hoverable">
                        <tbody>
                          <tr>
                            <td>IP address</td><td>:</td><td>{{ info.ip }}</td>
                          </tr>
                          <tr>
                            <td>ASN</td><td>:</td><td>{{ info.asn.asn }}</td>
                          </tr>
                          <tr>
                            <td>Organisation</td>
                            <td>:</td>
                            <td>{{ info.asn.name + ' (' + info.asn.type + ')' }}</td>
                          </tr>
                          <tr>
                            <td>Domain</td><td>:</td><td>{{ info.asn.domain }}</td>
                          </tr>
                          <tr>
                            <td>Connection</td>
                            <td>:</td>
                            <td>
                              <div class="buttons">
                                <span
                                  class="button is-small"
                                  v-for="(status, type) of info.threat"
                                  v-show="status"
                                  :key="type"
                                >
                                  {{ type }}
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div class="column is-12">
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-header-title">Location Information</h3>
                    </div>
                    <div class="card-content" id="detail-info-location">
                      <table class="table is-fullwidth is-hoverable">
                        <tbody>
                          <tr>
                            <td>Continent</td><td>:</td><td>{{ info.continent_name + ' (' + info.continent_code + ')' }}</td>
                          </tr>
                          <tr>
                            <td>Country</td><td>:</td>
                            <td>
                              <div class="buttons">
                                <span class="button is-small">{{ info.country_name + ' (' + info.country_code + ')' }}</span>
                                <span class="button is-light is-small"><img class="is-32x32" :src="info.flag" /></span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Region</td><td>:</td><td>{{ info.region + ' (' + info.region_code + ')' }}</td>
                          </tr>
                          <tr>
                            <td>City</td><td>:</td><td>{{ info.city }}</td>
                          </tr>
                          <tr>
                            <td>Language</td>
                            <td>:</td>
                            <td>
                              <p
                                v-for="(language, key, index) of info.languages"
                                :key="index"
                              >
                                {{ language.name + ' (' + language.native + ')' }}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>Currency</td>
                            <td>:</td>
                            <td>{{ info.currency.name + ' (' + info.currency.code + ')' }}</td>
                          </tr>
                          <tr>
                            <td>Calling code</td><td>:</td><td>+{{ info.calling_code }}</td>
                          </tr>
                          <tr>
                            <td>Postal</td><td>:</td><td>{{ info.postal }}</td>
                          </tr>
                          <tr>
                            <td>Cordinates</td><td>:</td><td>{{ info.latitude + ', ' + info.longitude }}</td>
                          </tr>
                          <tr>
                            <td>Timezone</td><td>:</td><td>{{ info.time_zone.name }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="column is-12-mobile is-12-tablet is-6-desktop">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-header-title">Location Map</h3>
                </div>
                <div class="card-content">
                  <div id="google-map" ref="googleMap"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-12">
      <div class="columns is-mobile is-centered is-vcentered" id="footer">
        <div class="column is-12-mobile is-two-fifths-tablet">
          <p class="has-text-centered has-text-grey-lighter">Copyright (c) 2019 <a class="has-text-light" href="https://github.com/mu545">Musa Sutisna</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import GoogleMapsAPILoader from 'google-maps-api-loader'
import axios from 'axios'

export default {
  name: 'home',
  data: function () {
    return {
      googleAPI: null,
      googleMap: null,
      googleMark: null
    }
  },
  computed: mapState([
    'config',
    'input',
    'info',
    'messages'
  ]),
  methods: {
    ...mapMutations([
      'newMessage',
      'clearMessages'
    ]),
    lookup: function () {
      this.$store.state.input.lookup = true
      this.clearMessages()

      axios.post(
        '/users/api/v1/ip',
        { ip: this.input.ip }
      ).then(res => {
        this.$store.state.info = res.data.info
        this.$store.state.input.lookup = false
        this.newMap()
      }).catch(() => {
        this.$store.state.input.lookup = false
        this.newMessage({
          type: 'is-danger',
          content: 'could not get requested ip address'
        })
      })
    },
    newMap: function () {
      this.config.map.center = {
        lat: this.info.latitude,
        lng: this.info.longitude
      }

      if (this.googleMap == null) {
        this.googleMap = new this.googleAPI.maps.Map(
          this.$refs.googleMap, this.config.map
        )
        this.googleMark = new this.googleAPI.maps.Marker({
          position: this.config.map.center,
          map: this.googleMap
        })
      } else {
        this.googleMap.setCenter(this.config.map.center)
        this.googleMark.setPosition(this.config.map.center)
      }
    },
    myip: function () {
      this.clearMessages()

      if (this.config.myip == null) {
        this.$store.state.input.lookup = false
        this.newMessage({
          type: 'is-danger',
          content: 'could not get your ip address information'
        })
        return
      }

      this.$store.state.input.ip = this.config.myip.ip
      this.$store.state.input.lookup = false
      this.$store.state.info = this.config.myip
      this.newMap()
    }
  },
  async mounted () {
    this.googleAPI = await GoogleMapsAPILoader({
      apiKey: process.env.VUE_APP_MAP_API_KEY
    })

    axios.get('/users/api/v1/ip')
      .then(res => {
        this.$store.state.config.myip = res.data.info
      })
      .catch(() => {
        this.newMessage({
          type: 'is-warning',
          content: 'could not get your ip address'
        })
      })
  }
}
</script>

<style>
body {
  width: 100%;
  height: 100%;
  background: #606060 url('~@/assets/styles/img/main-bg.png') no-repeat fixed center/100%;
  background-size: cover;
}

#app {
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
}

#input-area {
  min-height: 200px;
  background: url('~@/assets/styles/img/component-bg.png') no-repeat fixed center/100%;
  background-size: cover;
  border-top: 1px solid #606060;
  border-bottom: 1px solid #606060;
  box-shadow: 0px 0px 1em #303030 inset;
}

#notification {
  min-height: 200px;
}

#detail-info-general {
  overflow: auto;
}
#detail-info-location {
  overflow: auto;
}

#google-map {
  height: 300px;
}

#footer {
  min-height: 150px;
}
</style>
