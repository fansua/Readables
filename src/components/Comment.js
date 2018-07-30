import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as utils from '../utils/helpers'
import * as api from '../utils/ReadablesAPI'
import {updateCommentVote,deletePostComment,editPostComment } from '../actions'
import EditCommentModal from './EditCommentModal'
import Modal from 'react-modal'

Modal.setAppElement('#root')

class Comment extends Component{

  state ={
     voteOnComment:false,
     removingComment: false,
     commentModalOpen:false,
     editPostInfo:null,
  }
    handleCommentVote = (id,voteOption) => {

      const voteDetails = {
        option:voteOption,

      }
      this.setState(() => ({voteOnComment:true }))
      api.updateCommentVote(id,voteDetails).then( results => {

        this.props.uploadVoteToStore(results.id,results.voteScore)
          this.setState(() => ({voteOnComment:false }))
      });
    }
    removeComment = (id,postId) => {

      this.setState(() => ({removingComment:true }))
      api.deleteComment(id).then( removedComment => {
        api.getPostDetails(postId).then( rpost => {
          this.props.uploadDeletedCommentsInfoToStore(id,postId,removedComment,rpost)
     })
      });
    this.setState(() => ({removingComment:false }))
    }

    openEditCommentModal = (editCommentInfo) => {
    this.setState(() => ({
      commentModalOpen: true,
      editCommentInfo,
    }))
  }
  closeEditCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false,
    }))
  }

  updateEdittedComment = (id,editDetails) => {
    api.updateComment(id,editDetails).then( editDetails => {
     this.props.uploadCommentEditToStore(id,editDetails)

    });
  }


  render(){
    const {commentModalOpen,editCommentInfo} =this.state
    const {comment,postId} = this.props

    const filteredComments = (comment.length >0 && postId !==null ) ? comment.filter(c => c.parentId === postId && c.deleted === false) :""
    return(
      <div className="comments-container">
      {filteredComments && filteredComments.map((comment) => (
      <section className="comment" key={comment.id}>
      <hr />
      <div className="comment-description">{comment.body}</div>

            <small className="comment-Info"><span className="comment-author">Posted By:{comment.author}</span> on {utils.formatDate(comment.timestamp)}</small><br />

        <div className="comment-actions">


        <div className="icon-container" >{comment.voteScore}<i className="icon CommentCount" title="PostDetails-CommentCount"/>
          <div className="icon-desc">Votes</div>
        </div>

        <div className="icon-container" onClick={() => this.handleCommentVote(comment.id, "upVote")}><i className="icon Thumbs-Up" title="UpVote"/>
          <div className="icon-desc">UpVote</div>
        </div>
        <div className="icon-container" onClick={() => this.handleCommentVote(comment.id, "downVote")}><i className="icon Thumbs-Down" title="DownVote"/>
           <div className="icon-desc">DownVote</div>
        </div>
        <div className="icon-container" onClick={() => this.removeComment(comment.id,postId)}>
           <i className="icon Delete-Post" title="Remove Comment"/>
           <div className="icon-desc">Delete</div>
        </div>

        <div className="icon-container" onClick={() => this.openEditCommentModal(comment)}>
           <i className="icon Edit-Post" title="edit Post"/>
           <div className="icon-desc">Edit</div>
        </div>
        </div><br />
      </section>
        ))}

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          onRequestClose={this.closeEditCommentModal}
          contentLabel='Modal'
          >
          {commentModalOpen &&
            <div>
            <EditCommentModal
              editCommentInfo={editCommentInfo}
              onUpdateCommentDetails ={(id,editDetails) => {
                this.updateEdittedComment(id,editDetails)
                this.closeEditCommentModal()
              }}
              onCancelModal ={ ()=> {this.closeEditCommentModal()}}
            />

            </div>}
      </Modal>



    </div>
    )

  }
}

function mapStateToProps({categories, post,comment}){
  return{categories,post, comment}
}

function mapDispatchToProps (dispatch) {
  return {
    uploadVoteToStore: (id,voteScore) => dispatch(updateCommentVote(id,voteScore)),
    uploadDeletedCommentsInfoToStore: (commentId,postId,removedComment,rpost) => dispatch(deletePostComment(commentId,postId,removedComment,rpost)),
    uploadCommentEditToStore: (id,editDetails) => dispatch(editPostComment(id,editDetails))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Comment)
