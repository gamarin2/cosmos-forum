<template>
  <a class="pz-comment-form-btn" @click="authenticatedComment">
    <span class="form-input">Add a comment</span>
  </a>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['sessionUser'])
  },
  methods: {
    authenticatedComment () {
      this.$store.commit('setNewCommentPostId', this.$route.params.entry)
      this.$store.commit('setNewCommentParentId', this.$route.params.entry)
      if (!this.sessionUser.email) {
        this.$store.commit('setSessionRequest', '/comment/new')
        this.$router.push('/signup')
      } else {
        this.$router.push('/comment/new')
      }
    }
  }
}
</script>

<style lang="stylus">
@require '~@/styles/variables.styl'

.pz-comment-form-btn
  padding 0.5rem
  display block
  cursor pointer
  span.form-input
    display block
    width 100%
    border 1px solid bc
    height 2rem
    padding 0.25*x - 1px 0.375rem
    color light
  &:hover
    span.form-input
      border-color link

@media screen and (min-width: 414px)
  .pz-comment-form-btn
    padding 1rem

@media screen and (min-width: 768px)
  .pz-comment-form-btn
    padding 1.25rem

@media screen and (min-width: 1024px)
  .pz-comment-form-btn
    padding 1.5rem

@media screen and (min-width: 1280px)
  .pz-comment-form-btn
    padding 2.5rem
</style>
