<template lang="pug">
page(icon="message" title="All Discussions")
  part(title='Discussions')
    list-item(
      v-for="i in englishDiscussions"
      :key="i.id"
      :dt="i.title"
      :dd="i.subtitle"
      :to="'/d/' + i.id")

  part(title='Language-specific Discussions')
    list-item(
      v-for="i in i18nDiscussions"
      :key="i.id"
      :dt="i.title"
      :dd="i.subtitle"
      :to="'/d/' + i.id")
</template>

<script>
import { mapGetters } from 'vuex'
import AnchorCopy from '../common/AnchorCopy'
import ListItem from '../common/NiListItem'
import ToolBar from '../common/NiToolBar'
import Page from '../common/NiPage'
import Part from '../common/NiPart'
export default {
  name: 'page-index',
  components: {
    AnchorCopy,
    ListItem,
    Page,
    Part,
    ToolBar
  },
  computed: {
    ...mapGetters(['discussions']),
    englishDiscussions () {
      return this.discussions.filter(i => i.type === 'english')
    },
    i18nDiscussions () {
      return this.discussions.filter(i => i.type === 'i18n')
    }
  }
}
</script>
