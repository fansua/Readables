import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import * as api from '../utils/ReadablesAPI'
import {addPostComment } from '../actions'
import serializeForm from 'form-serialize'
import uniqid from 'uniqid'

class CommentForm extends Component {

  state = {
    addingcomment: false,
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const inputData = serializeForm(event.target, { hash: true })
    const  postID = this.props.match.params.post_id
    const inputCommentDetails = {
      id:uniqid(),
      timestamp:Date.now(),
      title: inputData.title,
      body: inputData.body,
      author: inputData.author,
      parentId: this.props.match.params.post_id,
    }


    this.syncNewComment(inputCommentDetails, postID)
    this.props.history.push('/')

  };

  syncNewComment = (commentDetails,postID) => {

    this.setState(() => ({addingcomment:true }))
    api.addPostComment(commentDetails).then( commentDetails =>{
    api.getPostDetails(postID).then( postDetails => {
    this.props.uploadCommentToStore(commentDetails,postID,postDetails)

    })
  });
    this.setState(() => ({addingcomment:false }))
}




  render() {

        const { match } = this.props

        return(
          <div >
            <h1>Add New Comment</h1>
            <form onSubmit={this.handleSubmit} className="CommentsForm">
              <div className='input-container'>

                    Title:<br />
                    <input
                      type='text'
                      name='title'
                      required='required'
                    />

                </div>
                <div className='input-container'>
                    Author: <br />
                    <input
                      type='text'
                      name='author'
                      required='required'
                    />
                </div>

                <div className='input-container'>

                    Content: <br />
                    <textarea
                      name='body'

                      required='required'
                    />
                </div>
                <button><Link className="" to={`/${match.params.category}/${match.params.post_id}`}>Cancel</Link></button>
                <button type="submit" className="">Add Comment</button>
            </form>
          </div>
        )
      }
}

function mapStateToProps({categories,post,comment}){
  return{categories}
}

function mapDispatchToProps (dispatch) {
  return {
    uploadCommentToStore: (commentDetails,postId,postDetails) => dispatch(addPostComment(commentDetails,postId,postDetails))

  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CommentForm)
