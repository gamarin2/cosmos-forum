<template lang="pug">
  menu.app-menu-user
    part(title='User')
      template(v-if="user.signedIn")
        list-item(to="/settings" exact @click.native="close" title="Settings")
        list-item(type="anchor" @click.native="signOut" title="Sign Out")
      template(v-else)
        list-item(type="anchor" @click.native="signIn" title="Sign In")
</template>

<script>
import { mapGetters } from 'vuex'
import noScroll from 'no-scroll'
import ListItem from './NiListItem'
import Part from './NiPart'
export default {
  name: 'app-menu-user',
  components: {
    ListItem,
    Part
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    close () {
      this.$store.commit('setActiveMenu', '')
      noScroll.off()
    },
    signOut () {
      this.$store.commit('signOut')
      this.close()
    },
    signIn () {
      this.$store.commit('signIn')
      this.close()
    }
  }
}
</script>

<style lang="stylus">
@require '~@/styles/variables.styl'

.app-menu-user
  background app-bg-alpha
  z-index 99
  user-select none

@media screen and (max-width:1023px)
  .app-menu-user
    height 100vh
    position fixed
    top 3rem
    left 0
    bottom 0
    width 100vw

    background bg-menu
    user-select none

@media screen and (min-width: 1024px)
  .app-menu-user
    nav > a
      height 3rem
      border-bottom 1px solid bc
</style>
