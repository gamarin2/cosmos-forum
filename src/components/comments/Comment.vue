<template>
  <div class="pz-comment" :id="`comment-${comment.id}`">
    <comment-container :comment="comment" :limit="nestLimitReached"></comment-container>
    <div class="pz-child-comments">
      <comment v-for="cc in comments" :comment="cc"  :key="cc.id"></comment>
    </div>
  </div>
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
    comments () { return orderedComments(this.allComments, this.comment.id) },
    ...mapGetters(['allComments'])
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
  background #fff

  .pz-comment
    padding-bottom 0.125em
    border-left 1px solid bc
    &:last-of-type
      margin-bottom 0.5em

@media screen and (min-width: 360px)
  .pz-comment
    padding-top 0.75em
    padding-bottom 0.75em

@media screen and (min-width: 768px)
  .pz-comment
    padding-left 0.75em
    .pz-comment
      border-left-color lighten(bc, 50%)

@media screen and (min-width: 1024px)
  .pz-comment
    padding-left 1em

@media screen and (min-width: 1280px)
  .pz-comment
    padding-left 2em
</style>
