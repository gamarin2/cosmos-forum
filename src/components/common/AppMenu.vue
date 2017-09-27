<template lang="pug">
  menu.app-menu
    list-item(to="/" exact @click.native="close" title="Index")
    part(title='Discussions')
      list-item(
        v-for="i in englishDiscussions"
        :key="i.id"
        :title="i.title"
        :to="'/d/' + i.id")

    part(title='Community')
      list-item(to="/users" exact @click.native="close" title="All Users")
  // 
    part(title='Wallet')
      list-item(to="/" exact @click.native="close" title="Balances")
      list-item(to="/wallet/send" exact @click.native="close" title="Send")
    part(title='Govern')
      list-item(to="/proposals" exact @click.native="close" title="Proposals")
    part(title='Stake')
      list-item(to="/staking" exact @click.native="close" title="Validator Candidates")
      list-item(to="/staking/nominate" exact @click.native="close" title="Self Nomination")
    part(title='Monitor')
      list-item(to="/blockchain" exact @click.native="close" title="Blockchain")
      list-item(to="/validators" exact @click.native="close" title="Validators"
        v-bind:class="{ 'active': isValidatorPage }")
      list-item(to="/delegators" exact @click.native="close" title="Delegators")
</template>

<script>
import { mapGetters } from 'vuex'
import noScroll from 'no-scroll'
import ListItem from './NiListItem'
import Part from './NiPart'
export default {
  name: 'app-menu',
  components: {
    ListItem,
    Part
  },
  computed: {
    ...mapGetters(['proposals', 'validators', 'discussions']),
    englishDiscussions () {
      return this.discussions.filter(i => i.type === 'english')
    },
    proposalAlerts () {
      return this.proposals
        .filter(p => p.flags.read === false).length
    },
    isValidatorPage () { return this.$route.params.validator }
  },
  methods: {
    close () {
      this.$store.commit('setActiveMenu', '')
      noScroll.off()
    }
  }
}
</script>

<style lang="stylus">
@require '~@/styles/variables.styl'

.app-menu
  background app-bg-alpha
  z-index 99
  user-select none

@media screen and (max-width:1023px)
  .app-menu
    height 100vh
    position fixed
    top 3rem
    left 0
    bottom 0
    width 100vw

    background bg-menu
    user-select none

@media screen and (min-width: 1024px)
  .app-menu
    nav > a
      height 3rem
      border-bottom 1px solid bc
</style>
