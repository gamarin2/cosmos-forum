const state = {
  id: 'peng-zhong',
  email: 'peng@tendermint.com',
  website: 'https://tendermint.com',
  signedIn: true
}

const mutations = {
  signIn (state) {
    state.signedIn = true
    console.log('signed in')
  },
  signOut (state) {
    state.signedIn = false
    console.log('signed out')
  }
}

export default {
  state,
  mutations
}
