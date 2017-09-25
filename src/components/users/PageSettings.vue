<template lang='pug'>
page(title="User Settings")
  form-struct(:submit='onSubmit')
    form-group(:error='$v.fields.id.$error'
      field-id='form-settings-id' field-label='Username')
      field#form-settings-id(
        type='text'
        placeholder='Username'
        v-model='fields.id')
      form-msg(name='Username' type='required'
        v-if='!$v.fields.id.required')
      form-msg(name='Username' type='length'
        min='2' max='32'
        v-if='!$v.fields.id.minLength || !$v.fields.id.maxLength')

    form-group(:error='$v.fields.email.$error'
      field-id='form-settings-email' field-label='Email Address')
      field#form-settings-email(
        type='email'
        placeholder='name@email.com'
        v-model='fields.email')
      form-msg(name='Email Address' type='required'
        v-if='!$v.fields.email.required')
      form-msg(name='Email Address' type='email'
        v-if='!$v.fields.email.email')

    form-group(:error='$v.fields.website.$error'
      field-id='form-settings-website' field-label='Website (Optional)')
      field#form-settings-website(
        type='text'
        placeholder='https://'
        v-model='fields.website')
      form-msg( name='Website' type='required'
        v-if='!$v.fields.website.required')
      form-msg(name='Website' type='url'
        v-if='!$v.fields.website.url')

    div(slot="footer")
      btn(
        type="link"
        :to="{ name: 'user', params: { user: user.id }}"
        icon="search"
        value="View Profile")
      btn(@click='onSubmit' icon="refresh" value="Update Settings")
</template>

<script>
import { mapGetters } from 'vuex'
import { minLength, maxLength, required, url, email } from 'vuelidate/lib/validators'
import Btn from '@nylira/vue-button'
import Field from '@nylira/vue-field'
import FieldAddon from '../common/NiFieldAddon'
import FieldGroup from '../common/NiFieldGroup'
import FormGroup from '../common/NiFormGroup'
import FormMsg from '../common/NiFormMsg'
import FormStruct from '../common/NiFormStruct'
import Page from '../common/NiPage'
export default {
  name: 'page-settings',
  components: {
    Btn,
    Field,
    FieldAddon,
    FieldGroup,
    FormGroup,
    FormMsg,
    FormStruct,
    Page
  },
  computed: {
    ...mapGetters(['config', 'user'])
  },
  created () {
    if (!this.user.signedIn) {
      this.$store.commit('notifyAuthRequired')
      this.$routes.push('/')
    }
  },
  data: () => ({
    edit: false,
    fields: {
      id: '',
      email: '',
      website: ''
    }
  }),
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$error) {
        console.log('error in form', this.$v)
        return
      }
    }
  },
  mounted () {
    if (this.user.signedIn) {
      this.fields.id = this.user.id
      this.fields.email = this.user.email
      this.fields.website = this.user.website
    }
  },
  validations: () => ({
    fields: {
      id: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(32)
      },
      email: { required, email },
      website: { required, url }
    }
  })
}
</script>
