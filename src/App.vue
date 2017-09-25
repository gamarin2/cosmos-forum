<template lang="pug">
#app
  app-header
  #app-content
    #app-main: router-view
    app-footer
  notifications(:notifications='notifications' theme='cosmos')
</template>

<script>
import { mapGetters } from 'vuex'
import AppFooter from './components/common/AppFooter'
import AppHeader from './components/common/AppHeader'
import Notifications from '@nylira/vue-notifications'
import firebase from './scripts/firebase'
import store from './store/index'
export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter,
    Notifications
  },
  computed: {
    ...mapGetters(['notifications'])
  },
  mounted () {
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.$store.commit('setSessionUserDisplayName', user.displayName)
        self.$store.commit('setSessionUserEmail', user.email)
        self.$store.commit('setSessionUserPhotoUrl', user.photoUrl)
        self.$store.commit('setSessionUserUid', user.uid)
        console.log('signed in:', user.email)
      } else {
        console.log('user is not signed in')
        // self.$store.commit('clearSessionUser')
      }
    })
  },
  store
}
</script>

<style lang="stylus" src="./styles/app.styl"></style>
