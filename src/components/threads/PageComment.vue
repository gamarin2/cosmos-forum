<template lang="pug">
page(:title='thread.title')
  tool-bar
    router-link(to="../")
      i.material-icons arrow_back
  part
    div(slot='title')
      | You're reading a single comment thread. 
      router-link(to="../") View all comments &rsaquo;
    comment-thread
</template>

<script>
import { mapGetters } from 'vuex'
import CommentThread from '../comments/CommentThread'
import Page from '../common/NiPage'
import Part from '../common/NiPart'
import ToolBar from '../common/NiToolBar'
export default {
  name: 'page-comment',
  components: {
    CommentThread,
    Page,
    Part,
    ToolBar
  },
  computed: {
    ...mapGetters(['threads', 'comments']),
    thread () {
      if (this.threads && this.threads.length > 0) {
        return this.threads.find(p => p.id === this.$route.params.thread)
      } else {
        return this.emptyThread
      }
    },
    comment () {
      this.comments.find(i => i.id === this.$route.params.comment)
    }
  }
}
</script>
