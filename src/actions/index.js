export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const GET_COMMENT_DETAILS = 'GET_COMMENT_DETAILS'

export const ADD_POST  = 'ADD_POST'
export const EDIT_POST  = 'EDIT_POST'
export const DELETE_POST  = 'DELETE_POST'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const ADD_COMMENT_TO_POST  = 'ADD_COMMENT_TO_POST'
export const EDIT_COMMENT_ON_POST  = 'EDIT_COMMENT_ON_POST'
export const DELETE_COMMENT_FROM_POST  = 'DELETE_COMMENT_FROM_POST'
export const UPDATE_POST_VOTE  = 'UPDATE_POST_VOTE'
export const UPDATE_COMMENT_VOTE  = 'UPDATE_COMMENT_VOTE'



export function getCategories(defaultCategories){
  return{
    type: GET_CATEGORIES,
    defaultCategories,
  }
}

export function getPosts(defaultPosts){
  return{
    type: GET_POSTS,
    defaultPosts,
  }
}

export function getCategoryPosts(category){
  return{
    type: GET_CATEGORY_POSTS ,
    category,
  }
}

export function getPostDetails(id){
  return{
    type: GET_POST_DETAILS,
    id,
  }
}

export function getPostComments(defaultComments){
  return{
    type: GET_POST_COMMENTS,
    defaultComments,
  }
}

export function getCommentDetails(id){
  return{
    type: GET_COMMENT_DETAILS,
    id,
  }
}

export function addPost(postDetails){
  return{
    type: ADD_POST,
    postDetails,
  }
}

export function editPost(id, editDetails){
  return{
    type: EDIT_POST,
    id,
    editDetails,
  }
}

export function deletePost(id){
  return{
    type: DELETE_POST ,
    id,
  }
}


export function addPostComment(commentDetails,postId,post){
  return{
    type: ADD_COMMENT_TO_POST,
   commentDetails,
   postId,
   post,
  }
}

export function editPostComment( id, editDetails){
  return{
    type: EDIT_COMMENT_ON_POST,
    id,
    editDetails,
  }
}

export function deletePostComment(id,postId,removedComment,rPost){
  return{
    type: DELETE_COMMENT_FROM_POST,
    id,
    postId,
    removedComment,
    rPost,
  }
}

export function updatePostVote(id, voteScore){
  return{
    type: UPDATE_POST_VOTE,
    id,
    voteScore
  }
}

export function updateCommentVote(id, voteScore){
  return{
    type: UPDATE_COMMENT_VOTE,
    id,
    voteScore,
  }
}
