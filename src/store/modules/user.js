const state = {
  id: 'peng-zhong',
  email: 'peng@tendermint.com',
  website: 'https://tendermint.com',
  signedIn: true,
  modalComment: {
    active: false,
    commentParentId: ''
  }
}

const mutations = {
  signIn (state) {
    state.signedIn = true
    console.log('signed in')
  },
  signOut (state) {
    state.signedIn = false
    console.log('signed out')
  },
  toggleModalComment (state, value) {
    state.modalComment.active = value
  },
  setCommentParent (state, parentId) {
    state.modalComment.commentParentId = parentId
  }
}

export default {
  state,
  mutations
}
