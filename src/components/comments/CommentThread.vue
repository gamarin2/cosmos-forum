<template lang="pug">
.pz-comments-container
  .pz-comments
    comment(:comment='threadParent')
</template>

<script>
import Comment from './Comment'
import CommentFormBtn from './CommentFormBtn'
import { mapGetters } from 'vuex'
export default {
  components: {
    CommentFormBtn,
    Comment
  },
  computed: {
    ...mapGetters(['comments']),
    threadParent () {
      if (this.comments.length > 0) {
        return this.comments.find(c => c.id === this.$route.params.comment)
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
    }
  }
}
</script>
