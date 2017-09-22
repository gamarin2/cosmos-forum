<template lang="pug">
page(:title='thread.title')
  tool-bar
    router-link(to="/" exact): i.material-icons arrow_back
    a(@click="threadIsSpam(thread.id)"): i.material-icons error
    a(@click="commentOnThread(thread.id)"): i.material-icons comment

  part(v-if="thread.type === 'text'")
    div(slot='title') Started by #[router-link(:to="{ name: 'user', params: { user: thread.validatorId }}") {{ thread.validatorId }}]
    text-block(:content="thread.data.text")

  part(title='Time to vote: 13D 23H 27M'): form-struct(:submit='confirmVote')
    field-vote(@click.native="vote('yes')" dt='Yes' :dd='yesPct'
      color='hsl(120,50%,35%)' :active="votePick === 'yes'" :results="voteVisible")

    field-vote(@click.native="vote('no')" dt='No' :dd="noPct"
      color='hsl(0,50%,35%)' :active="votePick === 'no'" :results="voteVisible")

    field-vote(@click.native="vote('reject')" dt='Reject' :dd="rejectPct"
      color='hsl(330,50%,35%)' :active="votePick === 'reject'" :results="voteVisible")

    field-vote(@click.native="vote('abstain')" dt='Abstain' :dd="abstainPct"
      color='hsl(0,0%,35%)' :active="votePick === 'abstain'" :results="voteVisible")

    div(slot='footer')
      btn(theme='cosmos' type='button' @click.native="toggleVoteVisible" value='Toggle Results')
      btn(theme='cosmos' type='submit' value='Confirm Vote')
</template>

<script>
import { mapGetters } from 'vuex'
import Btn from '@nylira/vue-button'
import FieldVote from '../common/NiFieldVote'
import FormStruct from '../common/NiFormStruct'
import Page from '../common/NiPage'
import Part from '../common/NiPart'
import TextBlock from '../common/TextBlock'
import ToolBar from '../common/NiToolBar'
export default {
  name: 'page-thread',
  components: {
    Btn,
    FieldVote,
    FormStruct,
    Page,
    Part,
    TextBlock,
    ToolBar
  },
  computed: {
    ...mapGetters(['threads']),
    thread () {
      if (this.threads && this.threads.length > 0) {
        return this.threads.find(p => p.id === this.$route.params.thread)
      } else {
        return this.emptyThread
      }
    },
    totalVotes () {
      return this.thread.score.yes +
        this.thread.score.no +
        this.thread.score.reject +
        this.thread.score.abstain
    },
    yesPct () { return this.thread.score.yes / this.totalVotes },
    noPct () { return this.thread.score.no / this.totalVotes },
    rejectPct () { return this.thread.score.reject / this.totalVotes },
    abstainPct () { return this.thread.score.abstain / this.totalVotes }
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
      type: '',
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
    commentOnThread (threadId) {
      this.$store.commit('notify', { title: 'View Discussion Thread',
        body: `TODO: Create comment on ${threadId} thread.`})
    },
    threadIsSpam (threadId) {
      this.$store.commit('notify', { title: 'Mark Thread As Spam',
        body: `TODO: Report ${threadId} to moderator log.`})
    },
    toggleVoteVisible () {
      this.voteVisible = !this.voteVisible
    }
  }
}
</script>
