export default function (comments, parentId) {
  // console.log('all comments', comments, parentId)

  let theseComments = comments.filter(c => c.parentId === parentId)
  // console.log('theseComments', theseComments)

  let datedComments = theseComments.sort((a, b) => b.dateCreated - a.dateCreated)
  // console.log('datedComments', datedComments)

  let ordered = datedComments.sort(function (a, b) {
    return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
  })
  // console.log('orderedComments', ordered)

  return ordered
}
