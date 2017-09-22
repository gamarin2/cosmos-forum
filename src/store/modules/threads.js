import data from '../json/threads.json'

const state = data
const mutations = {
  ADD_THREAD (state, thread) {
    thread.created_at = Date.now()
    state.push(thread)
    console.log('creating', JSON.stringify(thread))
  },
  RM_THREAD (state, thread) {
    state.splice(state.indexOf(thread), 1)
    console.log('removing', JSON.stringify(thread))
  },
  UPDATE_THREAD (state, thread) {
    console.log('modifying', JSON.stringify(thread))
    let date = new Date.Now()
    state.threads.child(thread.id).update({
      body: thread.body,
      updated_at: date
    })
  }
}
export default { state, mutations }
