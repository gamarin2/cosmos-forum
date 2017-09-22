<template lang="pug">
transition(name="thread")
  router-link.li-thread(:to="{ name: 'thread', params: { thread: thread.id }}")
    score-widget(:score="thread.score")
    .text
      .title {{ thread.title }}
      .meta
        .author {{ thread.validatorId }}
        .date {{ threadCreatedAtAgo }}
        .type {{ thread.type }}
</template>

<script>
import ScoreWidget from './ScoreWidget'
import dateUnix from '../../scripts/dateUnix'
import dateUnixAgo from '../../scripts/dateUnixAgo'
export default {
  name: 'li-thread',
  components: {
    ScoreWidget
  },
  computed: {
    threadCreatedAt () {
      return dateUnix(this.thread.createdAt)
    },
    threadCreatedAtAgo () {
      return dateUnixAgo(this.thread.createdAt)
    }
  },
  props: ['thread'],
  mounted () {
    let self = this

    if (this.thread.flags.new) {
      // console.log('this thread is new')
      setTimeout(function () {
        self.thread.flags.new = false
      }, 500)
    }
  }
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
  &:before
  &:after
    dot()
    background bc
    bottom -2*px
  &:before
    left -1*px
  &:after
    right -1*px

  .text
    flex 1
    display flex
    flex-flow column nowrap

  .title
    flex 1

    height 2rem
    font-size 0.875rem

    overflow hidden
    text-overflow ellipsis

    span
      font-label()
      color dim
      font-size 0.5rem
      line-height 1rem - 2*px
      display inline-block
      padding 0 0.25rem
      vertical-align middle
      border 1px solid bc-dim

  .meta
    font-label()
    display flex
    line-height 1rem
    font-size 0.666rem
    .author, .date
      margin-right 0.25rem
    .author
      color dim
    .date, .type
      color faint
@media screen and (min-width: 768px)
  .li-thread
    .chart
      margin-right 1rem
</style>
