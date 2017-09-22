<template lang="pug">
page(icon="face" :title="user.name")
  tool-bar
    router-link(to="/users" exact): i.material-icons arrow_back
    anchor-copy(value="TODO:replaceme" icon="content_copy")

  part(title='User Profile')
    list-item(dt="Threads" dd="5" to="/proposals")
    list-item(dt="Comments" dd="231" to="/slashes")
    list-item(dt="Vote History" dd="35 Votes" to="/votes")

  part(title='Staking')
    list-item(dt="ATOM" dd="2,428")
</template>

<script>
import { mapGetters } from 'vuex'
import AnchorCopy from '../common/AnchorCopy'
import ListItem from '../common/NiListItem'
import ToolBar from '../common/NiToolBar'
import Page from '../common/NiPage'
import Part from '../common/NiPart'
export default {
  name: 'page-user',
  components: {
    AnchorCopy,
    ListItem,
    Page,
    Part,
    ToolBar
  },
  computed: {
    ...mapGetters(['users']),
    user () {
      if (this.users) {
        return this.users.find(d => d.slug === this.$route.params.user)
      } else {
        return this.tmpUser
      }
    }
  },
  data: () => ({
    tmpUser: {
      id: 'Loading'
    }
  })
}
</script>
