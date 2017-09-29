<template lang="pug">
transition(name="thread")
  .li-thread
    vote-widget(:thread="thread")
    .text
      router-link.title(:to="{ name: 'page-thread', params: { thread: thread.id }}")
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
      return dateUnix(this.thread.createdAt)
    },
    threadCreatedAtAgo () {
      return dateUnixAgo(this.thread.createdAt)
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
    font-size .875rem
    line-height 1.125rem
    color txt
    height 2rem

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
    line-height 1rem
    font-size 0.75rem
    color dim
    a.author 
      padding-left 0.33rem
      &:hover
        color bright

@media screen and (min-width: 768px)
  .li-thread
    .chart
      margin-right 1rem
</style>
