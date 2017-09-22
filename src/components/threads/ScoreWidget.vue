<template lang='pug'>
.score-widget
  .increase: i.material-icons expand_less
  .value {{ totalScore }}
  .decrease: i.material-icons expand_more
</template>

<script>
export default {
  name: 'score-widget',
  computed: {
    totalScore () {
      return this.score.yes - this.score.no
    }
  },
  props: ['score']
}
</script>

<style lang='stylus'>
@require '~@/styles/variables.styl'

.score-widget
  position relative
  display flex
  flex-flow column
  align-items center
  justify-content center

  width 3rem
  height 4rem
  padding-right 1rem

  .value
    font-weight 400

  .label
    position absolute
    top 0.75rem - 1*px
    left 0.75em - 1*px

    width 2.5rem
    height 2.5rem
    border 1px dotted bc-dim
    border-radius 2rem

    display flex
    align-items center
    justify-content center
    line-height 1

    &.yes
      color bc-vivid
    &.no
      color accent1
    &.reject
      color accent2
</style>
