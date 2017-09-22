const state = {
  users: {
    search: {
      visible: false,
      query: ''
    }
  },
  threads: {
    search: {
      visible: false,
      query: ''
    }
  }
}
const mutations = {
  setSearchVisible (state, [type, bool]) {
    state[type].search.visible = bool
  },
  setSearchQuery (state, [type, string]) {
    console.log('setSearchQuery', type, string)
    state[type].search.query = string
  }
}
export default { state, mutations }
