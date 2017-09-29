<template lang="pug">
page(icon="add_box" :title="'New Thread in ' + discussion.title + ' Discussion'")
  tool-bar
    router-link(to="../" exact): i.material-icons arrow_back
  form-struct(:submit="onSubmit")
    form-group(:error="$v.fields.title.$error"
      field-id='thread-title' field-label='Thread Title')
      field#thread-title(
        autofocus
        type="text"
        placeholder="Thread Title"
        v-model="fields.title")
      form-msg(name='Thread Title' type='required'
        v-if='!$v.fields.title.required')
      form-msg(name='Thread Title' type='length'
        :min='titleMinLength' :max='titleMaxLength'
        v-if='!$v.fields.title.minLength || !$v.fields.title.maxLength')
    form-group(:error="$v.fields.body.$error"
      field-id='thread-body' field-label='Thread Body')
      field#thread-body(
        type="textarea"
        placeholder="Write your thread here..."
        v-model="fields.body")
      form-msg(name='Thread Body' type='required'
        v-if='!$v.fields.body.required')
      form-msg(name='Thread Body' type='length'
        :min='bodyMinLength' :max='bodyMaxLength'
        v-if='!$v.fields.body.minLength || !$v.fields.body.maxLength')
    form-group(:error="$v.fields.tagIds.$error"
      field-id='thread-tagIds' field-label='Thread Tags')
      field#thread-tagIds(
        type="text"
        placeholder="Tags..."
        v-model="fields.tagIds")
    div(slot="footer")
      div
      btn(icon="check" value="Submit Thread" type="submit")
</template>

<script>
import shortid from 'shortid'
import { mapGetters } from 'vuex'
import { minLength, maxLength, required } from 'vuelidate/lib/validators'
import Btn from '@nylira/vue-button'
import Field from '@nylira/vue-field'
import FieldGroup from '../common/NiFieldGroup'
import FormGroup from '../common/NiFormGroup'
import FormMsg from '../common/NiFormMsg'
import FormStruct from '../common/NiFormStruct'
import Page from '../common/NiPage'
import ToolBar from '../common/NiToolBar'
export default {
  name: 'page-threads-text',
  components: {
    Btn,
    Field,
    FieldGroup,
    FormGroup,
    FormMsg,
    FormStruct,
    Page,
    ToolBar
  },
  computed: {
    ...mapGetters(['user', 'discussions']),
    discussion () {
      if (this.discussions.length > 0) {
        return this.discussions.find(i => i.id === this.$route.params.discussion)
      } else {
        return {
          id: 'loading',
          title: 'Loading'
        }
      }
    }
  },
  data: () => ({
    titleMinLength: 10,
    titleMaxLength: 254,
    bodyMinLength: 10,
    bodyMaxLength: 40000,
    fields: {
      id: shortid.generate(),
      createdAt: '',
      title: '',
      body: '',
      userId: '',
      tagIds: '',
      votes: []
    }
  }),
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.$error) {
        let thread = this.fields
        thread.createdAt = Date.now()
        thread.userId = this.user.id
        thread.votes.push(this.user.id)
        thread.discussionId = this.$route.params.discussion

        // TODO: make tagIds better
        thread.tagIds = thread.tagIds.split(',')

        this.$store.commit('threadAdd', thread)
        this.$store.commit('notify', { title: 'New Thread Created', body: 'You\'ve successfully created a new thread.' })
        this.resetForm()
        this.$router.push('../')
      }
    },
    resetForm () {
      this.fields = {
        title: '',
        body: ''
      }
    }
  },
  validations: () => ({
    fields: {
      title: {
        required,
        minLength (x) { return minLength(this.titleMinLength)(x) },
        maxLength (x) { return maxLength(this.titleMaxLength)(x) }
      },
      body: {
        required,
        minLength (x) { return minLength(this.bodyMinLength)(x) },
        maxLength (x) { return maxLength(this.bodyMaxLength)(x) }
      },
      tagIds: {
      }
    }
  })
}
</script>
