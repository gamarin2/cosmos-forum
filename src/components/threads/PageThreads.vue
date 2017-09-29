<template lang="pug">
page(icon="message", :title="discussion.title + ' Discussion'")
  modal-search(v-if="filters.threads.search.visible" type="threads")
  tool-bar
    a(@click='setSearch(true)'): i.material-icons search
    router-link(:to="routeNewThread"): i.material-icons add
  part
    li-thread(v-for="p in filteredThreads" :key="p.id" :thread="p")
    list-item(v-if="filteredThreads.length === 0" :to="routeNewThread"
      dt="No Threads" dd="Break the ice by creating the first thread!")
</template>

<script>
import { mapGetters } from 'vuex'
import { includes } from 'lodash'
import Mousetrap from 'mousetrap'
import ListItem from '../common/NiListItem'
import LiThread from './LiThread'
import ModalSearch from '../common/ModalSearch'
import TabBar from '../common/NiTabBar'
import ToolBar from '../common/NiToolBar'
import Page from '../common/NiPage'
import Part from '../common/NiPart'
export default {
  name: 'page-threads-all',
  components: {
    ListItem,
    LiThread,
    ModalSearch,
    Page,
    Part,
    TabBar,
    ToolBar
  },
  computed: {
    ...mapGetters(['threads', 'filters', 'discussions']),
    discussion () {
      return this.discussions.find(i => i.id === this.$route.params.discussion)
    },
    routeNewThread () {
      return { name: 'page-threads-new', params: { discussion: this.discussion.id } }
    },
    filteredThreads () {
      if (this.threads && this.filters) {
        let query = this.filters.threads.search.query
        let threads = this.threads.filter(i => i.discussionId === this.$route.params.discussion)
        if (this.filters.threads.search.visible) {
          return threads.filter(p => includes(p.title.toLowerCase(), query))
        } else {
          return threads
        }
      } else {
        return []
      }
    }
  },
  methods: {
    newThread () { this.$router.push('/threads/new') },
    setSearch (bool) { this.$store.commit('setSearchVisible', ['threads', bool]) }
  },
  mounted () {
    Mousetrap.bind(['command+f', 'ctrl+f'], () => this.setSearch(true))
    Mousetrap.bind(['command+n', 'ctrl+n'], () => this.newThread())
    Mousetrap.bind('esc', () => this.setSearch(false))
  }
}
</script>

