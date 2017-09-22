<template lang="pug">
page(title='All Threads')
  modal-search(v-if="filters.threads.search.visible" type="threads")
  tool-bar
    a(@click='setSearch(true)'): i.material-icons search
    router-link(to="/threads/new" exact): i.material-icons add
  part
    li-thread(v-for="p in filteredThreads" :key="p.id" :thread="p")
</template>

<script>
import { mapGetters } from 'vuex'
import { includes, orderBy } from 'lodash'
import Mousetrap from 'mousetrap'
import LiThread from './LiThread'
import ModalSearch from '../common/ModalSearch'
import TabBar from '../common/NiTabBar'
import ToolBar from '../common/NiToolBar'
import Page from '../common/NiPage'
import Part from '../common/NiPart'
export default {
  name: 'page-threads-all',
  components: {
    LiThread,
    ModalSearch,
    Page,
    Part,
    TabBar,
    ToolBar
  },
  computed: {
    ...mapGetters(['threads', 'filters']),
    filteredThreads () {
      if (this.threads && this.filters) {
        let query = this.filters.threads.search.query
        let threads = orderBy(this.threads, [this.sort.property], [this.sort.order])
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
  data: () => ({
    sort: {
      property: 'created_at',
      order: 'desc',
      properties: [
        { id: 1, title: 'Title', value: 'title' },
        { id: 2, title: 'Type', value: 'type' },
        { id: 3, title: 'Created At', value: 'created_at', initial: true },
        { id: 4, title: 'Activated At', value: 'active_at' },
        { id: 5, title: 'Proposer', value: 'entity_id' }
      ]
    }
  }),
  methods: {
    gotoPrevote () {
      this.$store.commit('notify', { title: 'TODO: Prevote Threads', body: 'Work in progress.' })
    },
    gotoArchive () {
      this.$store.commit('notify', { title: 'TODO: Archive Threads', body: 'Work in progress.' })
    },
    gotoNewThread () { this.$router.push('/threads/new') },
    setSearch (bool) { this.$store.commit('setSearchVisible', ['threads', bool]) }
  },
  mounted () {
    Mousetrap.bind(['command+f', 'ctrl+f'], () => this.setSearch(true))
    Mousetrap.bind(['command+n', 'ctrl+n'], () => this.gotoNewThread())
    Mousetrap.bind('esc', () => this.setSearch(false))
  }
}
</script>

