<template lang='pug'>
page(title='All Users')
  modal-search(v-if="filters.users.search.visible" type="users")
  tool-bar
    a(@click='setSearch(true)'): i.material-icons search
  tab-bar
    router-link(to="/users" exact) Online ({{ online }})
    a Offline (0)
  list-item(
    v-for='i in filteredUsers'
    icon="face"
    :key="i.id"
    :title="i.name"
    :subtitle="i.groups.aib"
    :to="'/users/' + i.id")
</template>

<script>
import { mapGetters } from 'vuex'
import { includes, orderBy } from 'lodash'
import Mousetrap from 'mousetrap'
import ListItem from '../common/NiListItem'
import ModalSearch from '../common/ModalSearch'
import Page from '../common/NiPage'
import TabBar from '../common/NiTabBar'
import ToolBar from '../common/NiToolBar'
export default {
  name: 'page-users',
  components: {
    ListItem,
    ModalSearch,
    Page,
    TabBar,
    ToolBar
  },
  computed: {
    ...mapGetters(['users', 'filters']),
    filteredUsers () {
      let query = this.filters.users.search.query
      let list = orderBy(this.users, [this.sort.property], [this.sort.order])
      if (this.filters.users.search.visible) {
        return list.filter(i => includes(i.id.toLowerCase(), query))
      } else {
        return list
      }
    },
    online () { return this.filteredUsers.length }
  },
  data: () => ({
    todoAtoms: '74.18 ATOM',
    sort: {
      property: 'slug',
      order: 'asc',
      properties: [
        { id: 1, title: 'Slug', value: 'slug', initial: true },
        { id: 2, title: 'Name', value: 'name' },
        { id: 3, title: 'Bio', value: 'bio' }
      ]
    }
  }),
  methods: {
    setSearch (bool) { this.$store.commit('setSearchVisible', ['users', bool]) }
  },
  mounted () {
    Mousetrap.bind(['command+f', 'ctrl+f'], () => this.setSearch(true))
    Mousetrap.bind('esc', () => this.setSearch(false))
  }
}
</script>
