const api = "http://localhost:3001";



let token = 'OSOMs'

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

//Get all the Categories
export const getCategories = () =>
    fetch(`${api}/categories`, {
        headers
    })
    .then(res => res.json())
    .then(data => data.categories)

//Get all the posts
export const getPosts = () =>
    fetch(`${api}/posts`, {
        headers
    })
    .then(res => res.json())
//.then(data => data.posts)

//Get all the posts for a specific category
export const getPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, {
        headers
    })
    .then(res => res.json())
//  .then(data => data.postss)

//Get details of single post
export const getPostDetails = (id) =>
    fetch(`${api}/posts/${id}`, {
        headers
    })
    .then(res => res.json())
//  .then(data => data.postsss)

//Get all the comments for a single post
export const getPostComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, {
        headers
    })
    .then(res => res.json())
//  .then(data => data.postsss)

//Get details about a single comment
export const getCommentDetails = (id) =>
    fetch(`${api}/comments/${id}`, {
        headers
    })
    .then(res => res.json())
//  .then(data => data.postsss)

// Add a new post
export const addPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json())
//  .then(data => data.posts)

//Vote on post
export const updatePostVote = (id, option) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(option)
    }).then(res => res.json())
//.then(data => data.posts)

// Add post comment
export const addPostComment = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())
//  .then(data => data.posts)

//Vote on comment
export const updateCommentVote = (id, option) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(option)
    }).then(res => res.json())
//.then(data => data.posts)


//Edit details of exisiting post
export const updatePost = (id, post) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json())
//.then(data => data.posts)


//Edit details of existing comment
export const updateComment = (id, comment) =>
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())
//.then(data => data.posts)

//Delete post and comments
export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
//.then(data => data.posts)


//delete comment
export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
//.then(data => data.posts)
