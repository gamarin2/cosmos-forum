<template lang='pug'>
.ni-modal-comment(v-if="user.modalComment.active")
  form-struct(:submit="onSubmit")
    header
      .title
        i.material-icons comment
        | New Comment
      btn(icon="close" @click.native="close")
    form-group(:error="$v.fields.body.$error")
      field#new-comment(
        autofocus
        type="textarea"
        placeholder="Type comment here..."
        v-model="fields.body")
      form-msg(name='Comment Body' type='required'
        v-if='!$v.fields.body.required')
      form-msg(name='Comment Body' type='length'
        :min='bodyMinLength' :max='bodyMaxLength'
        v-if='!$v.fields.body.minLength || !$v.fields.body.maxLength')
    footer
      div thread: {{ thread.id }}
      btn(icon="check" type="submit" value="Submit")
</template>

<script>
import { mapGetters } from 'vuex'
import { minLength, maxLength, required } from 'vuelidate/lib/validators'
import shortid from 'shortid'
import FormGroup from '../common/NiFormGroup'
import FormMsg from '../common/NiFormMsg'
import FormStruct from '../common/NiFormStruct'
import Btn from '@nylira/vue-button'
import Field from '@nylira/vue-field'
export default {
  name: 'modal-comment',
  components: {
    Btn,
    Field,
    FormGroup,
    FormMsg,
    FormStruct
  },
  computed: {
    ...mapGetters(['user'])
  },
  data: () => ({
    bodyMinLength: 10,
    bodyMaxLength: 40000,
    fields: {
      id: '',
      body: '',
      dateCreated: 0,
      discussionId: '',
      parentId: '',
      threadId: '',
      userId: '',
      votes: []
    }
  }),
  methods: {
    close () {
      this.$store.commit('toggleModalComment', false)
    },
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.$error) {
        let comment = this.fields

        comment.id = shortid.generate()
        comment.votes.push(this.user.id)
        comment.discussionId = this.$route.params.discussion
        comment.threadId = this.thread.id
        comment.userId = this.user.id

        if (this.user.modalComment.commentParentId) {
          comment.parentId = this.user.modalComment.commentParentId
        } else {
          comment.parentId = this.thread.id
        }

        this.$store.commit('commentAdd', comment)
        this.$store.commit('notify', { title: 'Comment Added', body: 'You\'ve submitted your comment.' })

        this.$store.commit('setCommentParent', '')

        this.close()
        this.resetForm()
      }
    },
    resetForm () {
      this.fields = {
        id: shortid.generate(),
        body: '',
        dateCreated: 0,
        discussionId: '',
        parentId: '',
        threadId: '',
        userId: '',
        votes: []
      }
    }
  },
  props: ['thread', 'parent-id'],
  validations: () => ({
    fields: {
      body: {
        required,
        minLength (x) { return minLength(this.bodyMinLength)(x) },
        maxLength (x) { return maxLength(this.bodyMaxLength)(x) }
      }
    }
  })
}
</script>

<style lang="stylus">
@require '~@/styles/variables.styl'

.ni-modal-comment
  width 100vw
  height 100vh

  max-width 375px
  max-height 667px

  position fixed
  bottom 0
  right 0

  z-index 100

  background app-bg
  border 1px solid bc

  display flex

  .ni-form, .ni-form-main
    display flex
    flex 1

  .ni-form-main
    flex-flow column nowrap
    padding 1rem

    header, .ni-form-struct
      margin-bottom 1rem

    header, footer
      height 2rem
      display flex
      align-items center
      justify-content space-between

    header
      .title
        display flex
        align-items center
        i
          margin-right 0.5rem

    .ni-form-group
      margin-bottom 1rem

    .ni-form-group, .ni-form-group-field
      flex 1
      display flex
      flex-flow column

    .ni-form-group
      padding-left 0
      padding-right 0
      padding-top 0

      .ni-field
        flex 1
        height auto
</style>
