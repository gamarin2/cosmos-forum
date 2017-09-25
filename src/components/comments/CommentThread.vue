<template>
  <div class="pz-comments-container">
    <router-link class="pz-comments-alert" :to="postLink">
      You're viewing a single comment thread.
      <strong>View all comments &rsaquo;</strong>
    </router-link>
    <div class="pz-comments">
      <comment :comment="threadParent"></comment>
    </div>
    <router-link class="pz-comments-alert" :to="postLink" v-if="pageIsLong">
      You're reading a single comment's thread.
      <strong>View all comments &rsaquo;</strong>
    </router-link>
  </div>
</template>

<script>
import Comment from './Comment'
import CommentFormBtn from './CommentFormBtn'
import { mapGetters } from 'vuex'
import documentHeight from '../../scripts/documentHeight'
export default {
  components: {
    CommentFormBtn,
    Comment
  },
  computed: {
    pageIsLong () {
      if (documentHeight > window.innerHeight) return true
      return false
    },
    postLink () {
      return `/blog/${this.$route.params.entry}#comments`
    },
    threadParent () {
      if (this.allComments.length > 0) {
        return this.allComments.find(c => c.id === this.$route.params.comment)
      }
      return {
        id: 'none',
        userId: 'Loading...',
        dateCreated: +Date.now(),
        body: 'Loading...',
        upvotes: 34,
        downvotes: 5,
        postId: '',
        parentId: ''
      }
    },
    ...mapGetters([
      'allComments'
    ])
  }
}
</script>

<style lang="stylus">
@require '~@/styles/variables.styl'

.pz-comments-alert
  display block
  background #fff
  padding 0.5rem
  color txt
  margin 0.5rem 0
  font-size 0.875rem
  strong
    display block
    color link
    font-weight 500
</style>
