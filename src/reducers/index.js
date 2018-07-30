
import { combineReducers } from 'redux'
import{
  GET_CATEGORIES,GET_POSTS,GET_POST_COMMENTS,
  ADD_POST, EDIT_POST, DELETE_POST,
  ADD_COMMENT_TO_POST, EDIT_COMMENT_ON_POST, DELETE_COMMENT_FROM_POST,
  UPDATE_POST_VOTE, UPDATE_COMMENT_VOTE
}from '../actions'

function categories (state = [], action){


  switch (action.type) {

    case GET_CATEGORIES:
       return state.concat(action.defaultCategories)

    default:
      return state

  }

}

function post (state = [], action){

  switch (action.type) {

    case GET_POSTS:
      return state.concat(action.defaultPosts)

    case ADD_POST:
      return state.concat(action.postDetails)

    case EDIT_POST:
      let postEditArray = state.map(val => val)
      let postEditIndex = postEditArray.findIndex( x => x.id === action.id)
      postEditArray[postEditIndex].title = action.editDetails.title
      postEditArray[postEditIndex].body = action.editDetails.body
      return postEditArray

    case DELETE_POST:
      let deletePostArray = state.map( val => val)
      let  deletePostIndex = deletePostArray.findIndex( x => x.id === action.id)
      deletePostArray[deletePostIndex].deleted =true
      return deletePostArray

      case DELETE_COMMENT_FROM_POST:
        let countUpdated = state.map( val => val)
        let  countIndex = state.findIndex( x => x.id === action.postId)
        countUpdated[countIndex].commentCount = action.rPost.commentCount
        return countUpdated

    case ADD_COMMENT_TO_POST:
      let newCommentCount = state.map( val => val)
      let  countI = state.findIndex( x => x.id === action.postId)
      newCommentCount[countI].commentCount = action.post.commentCount
      return newCommentCount

    case UPDATE_POST_VOTE:
     let updateArray = state.map( val => val)
      let  updateIndex = state.findIndex( x => x.id ===  action.id)
      updateArray[updateIndex].voteScore = action.voteScore
      return updateArray

    default:
      return state

  }

}


function comment (state =[], action) {

  switch (action.type) {

    case GET_POST_COMMENTS:
      return state.concat(action.defaultComments)
    case ADD_COMMENT_TO_POST:
      let newCommentArray =[]
      newCommentArray.push(action.commentDetails)
      return state.concat(newCommentArray)

    case EDIT_COMMENT_ON_POST:
      let commentEditArray = state.map(val => val)
      let commentEditIndex = commentEditArray.findIndex( x => x.id === action.id)
      commentEditArray[commentEditIndex].timestamp = action.editDetails.timestamp
      commentEditArray[commentEditIndex].body = action.editDetails.body
      return commentEditArray

    case DELETE_POST:
      let deleteArray = state.map( val => val)
      let filterArray = state.filter(val => val.parentId === action.id)
      if(filterArray.length >0){
        filterArray.forEach(val =>{
          let  deleteindex = state.findIndex( i => i.id === val.id)
          deleteArray[deleteindex].parentDeleted = true
        })
      }else{
        return state
       }
        return deleteArray

    case DELETE_COMMENT_FROM_POST:
      let commentArray = state.map( val => val)
      let  commentIndex = state.findIndex( x => x.id === action.id)
      commentArray[commentIndex].deleted =true
      return commentArray

    case UPDATE_COMMENT_VOTE:
      let newArray = state.map( val => val)
      let  index = state.findIndex( x => x.id === action.id)
      newArray[index].voteScore = action.voteScore
      return newArray
      
    default:
      return state

  }
}
export default combineReducers({categories,post, comment})
