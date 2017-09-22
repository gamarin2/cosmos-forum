const state = {
  faq: {
    elementsVisible: [],
    tocVisible: false
  },
  whitepaper: {
    elementsVisible: [],
    tocVisible: false
  }
}

const mutations = {
  setFaqElementsVisible (state, value) {
    state.faq.elementsVisible = value
  },
  setFaqTocVisible (state, value) {
    // console.log('MUTATION: faqTocVisible', value)
    state.faq.tocVisible = value
  },
  setWhitepaperElementsVisible (state, value) {
    state.whitepaper.elementsVisible = value
  },
  setWhitepaperTocVisible (state, value) {
    // console.log('MUTATION: whitepaperTocVisible', value)
    state.whitepaper.tocVisible = value
  }
}

export default {
  state,
  mutations
}
