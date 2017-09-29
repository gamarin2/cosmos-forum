<template lang="pug">
page(:title='thread.title')
  modal-comment(:thread="thread")
  tool-bar
    router-link(to="../" exact)
      i.material-icons arrow_back
    a(@click="threadIsSpam"): i.material-icons error
    a(@click="newComment"): i.material-icons comment

  part
    div(slot='title')
      | {{ threadCreatedAtAgo }} by 
      router-link(:to="{ name: 'user', params: { user: thread.userId }}")
        | {{ thread.userId }} 
      | in 
      router-link(:to="{ name: 'threads', params: { discussion: thread.discussionId }}") {{ thread.discussionId }}
    text-block(:content="thread.body")
  part
    div(slot='title') Comments on this thread
    comments
</template>

<script>
import dateUnixAgo from '../../scripts/dateUnixAgo'
import { mapGetters } from 'vuex'
import Btn from '@nylira/vue-button'
import Comments from '../comments/Comments'
import FormStruct from '../common/NiFormStruct'
import ListItem from '../common/NiListItem'
import ModalComment from './ModalComment'
import Page from '../common/NiPage'
import Part from '../common/NiPart'
import TextBlock from '../common/TextBlock'
import ToolBar from '../common/NiToolBar'
export default {
  name: 'page-thread',
  components: {
    Btn,
    Comments,
    FormStruct,
    ListItem,
    ModalComment,
    Page,
    Part,
    TextBlock,
    ToolBar
  },
  computed: {
    ...mapGetters(['threads', 'comments']),
    threadComments () {
      return this.comments.filter(i => i.parentId === this.thread.id)
    },
    threadCreatedAtAgo () {
      return dateUnixAgo(this.thread.dateCreated)
    },
    thread () {
      if (this.threads && this.threads.length > 0) {
        return this.threads.find(p => p.id === this.$route.params.thread)
      } else {
        return this.emptyThread
      }
    }
  },
  created () {
    this.$watch('$route.params', this.refreshThread)
  },
  data: () => ({
    emptyThread: {
      id: '',
      active_at: '',
      created_at: '',
      entity_id: '',
      title: 'Loading',
      flags: {
        passed: false
      },
      data: {
        body: '',
        old_members: '',
        new_members: ''
      },
      vote_id: 0
    },
    votePick: 'abstain',
    voteVisible: false
  }),
  methods: {
    trunc (text) {
      return text.substring(0, 40)
    },
    vote (choice, $event) {
      this.votePick = choice
    },
    confirmVote () {
      this.$store.commit('notify', { title: `Voted '${this.votePick}'`,
        body: 'Your vote has been submitted.'})
    },
    refreshThread () {
      if (this.rawThread) {
        this.thread = this.rawThread
      } else {
        this.thread = this.emptyThread
      }
    },
    newComment (threadId) {
      this.$store.commit('toggleModalComment', true)
    },
    threadIsSpam (threadId) {
      this.$store.commit('notify', { title: 'Mark Thread As Spam',
        body: `TODO: Report ${threadId} to moderator log.`})
    }
  }
}
</script>
