const state = {
  activeMenu: '',
  desktop: false
}

const mutations = {
  setActiveMenu (state, value) {
    state.activeMenu = value
  },
  setDesktop (state, value) {
    state.desktop = value
  }
}

export default { state, mutations }
