<template lang='pug'>
.vote-widget(:class="cssClass")
  .btn-vote.btn-vote-yea(@click='voteYea'): i.material-icons expand_less
  .value {{ totalVotes }}
  .btn-vote.btn-vote-nay(@click='voteNay'): i.material-icons expand_more
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'vote-widget',
  computed: {
    ...mapGetters(['user']),
    totalVotes () {
      return this.thread.votes.yea.length - this.thread.votes.nay.length
    },
    votedYea () { return this.thread.votes.yea.includes(this.user.id) },
    votedNay () { return this.thread.votes.nay.includes(this.user.id) },
    cssClass () {
      let value = ''
      if (this.votedYea) { value += 'vote-widget-yea' }
      if (this.votedNay) { value += 'vote-widget-nay' }
      return value
    }
  },
  methods: {
    voteYea () {
      if (this.votedNay) {
        this.$store.commit('threadVoteReset', { threadId: this.thread.id, userId: this.user.id })
        this.$store.commit('threadVoteYea', { threadId: this.thread.id, userId: this.user.id })
      } else if (this.votedYea) {
        this.$store.commit('threadVoteReset', { threadId: this.thread.id, userId: this.user.id })
      } else {
        this.$store.commit('threadVoteYea', { threadId: this.thread.id, userId: this.user.id })
      }
    },
    voteNay () {
      if (this.votedYea) {
        this.$store.commit('threadVoteReset', { threadId: this.thread.id, userId: this.user.id })
        this.$store.commit('threadVoteNay', { threadId: this.thread.id, userId: this.user.id })
      } else if (this.votedNay) {
        this.$store.commit('threadVoteReset', { threadId: this.thread.id, userId: this.user.id })
      } else {
        this.$store.commit('threadVoteNay', { threadId: this.thread.id, userId: this.user.id })
      }
    }
  },
  props: ['thread']
}
</script>

<style lang='stylus'>
@require '~@/styles/variables.styl'

.vote-widget
  position relative
  display flex
  flex-flow column
  align-items center
  justify-content center

  width 3rem
  height 4.5rem
  padding-right 1rem
  margin -0.5rem 0

  .btn-vote
    display flex
    align-items center
    justify-content center
    width 1.5rem
    height 1.5rem

  .value
    height 1.5rem

  &.vote-widget-yea
    .btn-vote-yea, .value
      color accent1
  &.vote-widget-nay
    .btn-vote-nay, .value
      color accent2
</style>
