<template lang="pug">
.pz-comment(:id='`comment-${comment.id}`')
  comment-container(:comment='comment', :limit='nestLimitReached')
  .pz-child-comments
    comment(v-for='i in filteredComments', :comment='i', :key='i.id')
</template>

<script>
import CommentContainer from './CommentContainer'
import { mapGetters } from 'vuex'
import orderedComments from '../../scripts/orderedComments'
export default {
  name: 'comment',
  components: {
    CommentContainer
  },
  computed: {
    filteredComments () { return orderedComments(this.comments, this.comment.id) },
    ...mapGetters(['comments'])
  },
  data () {
    return {
      nestLimitReached: true
    }
  },
  methods: {
    isCont (component) {
      return component.$el.classList.contains('pz-comments-container')
    },
    getNestLimitReached () {
      let t = this
      let limited = true
      if (t.$parent && t.isCont(t.$parent)) {
        limited = false
      }
      if (t.$parent && t.$parent.$parent && t.isCont(t.$parent.$parent)) {
        limited = false
      }
      if (t.$parent && t.$parent.$parent && t.$parent.$parent.$parent && t.isCont(t.$parent.$parent.$parent)) {
        limited = false
      }
      if (t.$parent && t.$parent.$parent && t.$parent.$parent.$parent && t.$parent.$parent.$parent.$parent && t.isCont(t.$parent.$parent.$parent.$parent)) {
        limited = false
      }
      if (t.$parent && t.$parent.$parent && t.$parent.$parent.$parent && t.$parent.$parent.$parent.$parent && t.$parent.$parent.$parent.$parent.$parent && t.isCont(t.$parent.$parent.$parent.$parent.$parent)) {
        limited = false
      }
      if (t.$parent && t.$parent.$parent && t.$parent.$parent.$parent && t.$parent.$parent.$parent.$parent && t.$parent.$parent.$parent.$parent.$parent && t.$parent.$parent.$parent.$parent.$parent.$parent && t.isCont(t.$parent.$parent.$parent.$parent.$parent.$parent)) {
        limited = false
      }
      if (t.$parent && t.$parent.$parent && t.$parent.$parent.$parent && t.$parent.$parent.$parent.$parent && t.$parent.$parent.$parent.$parent.$parent && t.$parent.$parent.$parent.$parent.$parent.$parent && t.$parent.$parent.$parent.$parent.$parent.$parent.$parent && t.isCont(t.$parent.$parent.$parent.$parent.$parent.$parent.$parent)) {
        limited = false
      }
      return limited
    }
  },
  mounted () {
    this.nestLimitReached = this.getNestLimitReached()
  },
  props: ['comment']
}
</script>

<style lang="stylus">
@require '~@/styles/variables.styl'

.pz-comment
  padding 0.5em 0 0.5em 0.5em

  .pz-comment
    padding-bottom 0.125em
    border-left 1px solid bc-dim
    &:last-of-type
      margin-bottom 0.5em

@media screen and (min-width: 360px)
  .pz-comment
    padding-top 0.75em
    padding-bottom 0.75em

@media screen and (min-width: 768px)
  .pz-comment
    padding-left 0.75em

@media screen and (min-width: 1024px)
  .pz-comment
    padding-left 1em
</style>
