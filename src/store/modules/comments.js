import data from '../json/comments.json'

const state = data

const mutations = {
  commentVoteYea (state, { commentId, userId }) {
    let comment = state.find(i => i.id === commentId)
    if (!comment.votes.yea.includes(userId)) {
      comment.votes.yea.push(userId)
    }
  },
  commentVoteNay (state, { commentId, userId }) {
    let comment = state.find(i => i.id === commentId)
    if (!comment.votes.nay.includes(userId)) {
      comment.votes.nay.push(userId)
    }
  },
  commentVoteReset (state, { commentId, userId }) {
    let comment = state.find(i => i.id === commentId)
    comment.votes.yea = comment.votes.yea.filter(i => i !== userId)
    comment.votes.nay = comment.votes.nay.filter(i => i !== userId)
    console.log(userId, 'reset vote on', commentId)
  },
  commentAdd (state, comment) {
    comment.dateCreated = Date.now()
    state.push(comment)
    console.log('comment add', JSON.stringify(comment))
  },
  commentRemove (state, comment) {
    state.splice(state.indexOf(comment), 1)
    console.log('comment rm', JSON.stringify(comment))
  },
  commentUpdate (state, comment) {
    console.log('comment mv', JSON.stringify(comment))
    let date = new Date.Now()
    state.comments.child(comment.id).update({
      body: comment.body,
      updatedAt: date
    })
  }
}

export default { state, mutations }
