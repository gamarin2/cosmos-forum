<template lang="pug">
page(icon="comment" :title="user.name + ' - Comments'")
  tool-bar
    router-link(:to="{ name: 'user', params: { user: user.id }}"): i.material-icons arrow_back
  part(title='Comments')
    list-item(dt="TODO" dd="TODO" to="/")
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from '../common/NiListItem'
import ToolBar from '../common/NiToolBar'
import Page from '../common/NiPage'
import Part from '../common/NiPart'
export default {
  name: 'page-user-comments',
  components: {
    ListItem,
    Page,
    Part,
    ToolBar
  },
  computed: {
    ...mapGetters(['users']),
    user () {
      if (this.users) {
        return this.users.find(d => d.id === this.$route.params.user)
      } else {
        return this.tmpUser
      }
    }
  }
}
</script>
