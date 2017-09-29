import data from '../json/threads.json'

const state = data

const mutations = {
  /*
  threadVoteYea (state, { threadId, userId }) {
    let thread = state.find(i => i.id === threadId)
    if (!thread.votes.yea.includes(userId)) {
      thread.votes.yea.push(userId)
    }
  },
  threadVoteNay (state, { threadId, userId }) {
    let thread = state.find(i => i.id === threadId)
    if (!thread.votes.nay.includes(userId)) {
      thread.votes.nay.push(userId)
    }
  },
  threadVoteReset (state, { threadId, userId }) {
    let thread = state.find(i => i.id === threadId)
    thread.votes.yea = thread.votes.yea.filter(i => i !== userId)
    thread.votes.nay = thread.votes.nay.filter(i => i !== userId)
    console.log(userId, 'reset vote on', threadId)
  },
  */
  threadVote (state, { threadId, userId }) {
    let thread = state.find(i => i.id === threadId)
    if (!thread.votes.includes(userId)) {
      thread.votes.push(userId)
    }
  },
  threadVoteReset (state, { threadId, userId }) {
    let thread = state.find(i => i.id === threadId)
    thread.votes = thread.votes.filter(i => i !== userId)
    console.log(userId, 'reset vote on', threadId)
  },
  threadAdd (state, thread) {
    thread.dateCreated = Date.now()
    state.push(thread)
    console.log('thread add', JSON.stringify(thread))
  },
  threadRemove (state, thread) {
    state.splice(state.indexOf(thread), 1)
    console.log('thread rm', JSON.stringify(thread))
  },
  threadUpdate (state, thread) {
    console.log('thread mv', JSON.stringify(thread))
    let date = new Date.Now()
    state.threads.child(thread.id).update({
      body: thread.body,
      updatedAt: date
    })
  }
}

export default { state, mutations }
