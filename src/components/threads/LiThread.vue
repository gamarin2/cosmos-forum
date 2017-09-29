<template lang="pug">
transition(name="thread")
  .li-thread
    vote-widget(:thread="thread")
    .text
      router-link.title(:to="{ name: 'thread', params: { thread: thread.id }}")
        | {{ thread.title }}
        .tag(v-for="i in thread.tagIds") {{ i }}
      .meta {{ commentCount }} comments &ndash; {{ threadCreatedAtAgo }} by 
        router-link.author(:to="{ name: 'user', params: { user: thread.userId }}")
          | {{ thread.userId }}
</template>

<script>
import VoteWidget from './VoteWidget'
import dateUnix from '../../scripts/dateUnix'
import dateUnixAgo from '../../scripts/dateUnixAgo'
export default {
  name: 'li-thread',
  components: {
    VoteWidget
  },
  computed: {
    commentCount () {
      return 0
    },
    threadCreatedAt () {
      return dateUnix(this.thread.dateCreated)
    },
    threadCreatedAtAgo () {
      return dateUnixAgo(this.thread.dateCreated)
    }
  },
  props: ['thread']
}
</script>

<style lang="stylus">
@require '~@/styles/variables.styl'

.li-thread
  border-bottom 1px solid bc-dim
  padding 0.75rem 1rem 0.75rem - px
  display flex
  position relative

  color txt

  .text
    flex 1
    display flex
    flex-flow column nowrap

  a.title
    flex 1
    color txt
    margin-bottom 0.5rem

    overflow hidden
    text-overflow ellipsis

    .tag
      color dim
      font-size 0.75rem
      line-height 1rem - 2*px
      display inline-block
      padding 0 0.25rem
      margin-left 0.25rem
      vertical-align middle
      background bc-faint

    &:hover
      color bright

  .meta
    display flex
    font-size 0.75rem
    color dim
    a.author 
      padding-left 0.33rem
      &:hover
        color bright
</style>
